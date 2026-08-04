"use client";

import { useCallback, useRef, useState } from "react";
import NextImage from "next/image";
import type { Locale } from "@/lib/locales";

const strings = {
  ko: {
    specTitle: "규격",
    ratio: "비율",
    size: "권장 해상도",
    uploadTitle: "이미지 미리보기 & 다운로드",
    dropText: "이미지를 선택하거나 드래그하세요",
    chooseFile: "파일 선택",
    download: "다운로드",
    selectFormat: "규격 선택",
  },
  en: {
    specTitle: "Format",
    ratio: "Ratio",
    size: "Recommended size",
    uploadTitle: "Preview & Download",
    dropText: "Choose an image or drag it here",
    chooseFile: "Choose file",
    download: "Download",
    selectFormat: "Select format",
  },
} as const;

type Spec = { key: string; ko: string; en: string; ratio: string; width: number; height: number };

const specs: Spec[] = [
  { key: "square", ko: "피드 정사각형", en: "Feed — Square", ratio: "1:1", width: 1080, height: 1080 },
  { key: "portrait", ko: "피드 세로형", en: "Feed — Portrait", ratio: "4:5", width: 1080, height: 1350 },
  { key: "landscape", ko: "피드 가로형", en: "Feed — Landscape", ratio: "1.91:1", width: 1080, height: 566 },
  { key: "story", ko: "스토리 / 릴스", en: "Story / Reels", ratio: "9:16", width: 1080, height: 1920 },
  { key: "profile", ko: "프로필 사진", en: "Profile Picture", ratio: "1:1", width: 320, height: 320 },
];

export default function InstagramSizeGuide({ locale }: { locale: Locale }) {
  const t = strings[locale];
  const [specKey, setSpecKey] = useState<string>("square");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const sourceImage = useRef<HTMLImageElement | null>(null);

  const spec = specs.find((s) => s.key === specKey)!;

  const render = useCallback((img: HTMLImageElement, target: Spec) => {
    const canvas = document.createElement("canvas");
    canvas.width = target.width;
    canvas.height = target.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scale = Math.max(target.width / img.width, target.height / img.height);
    const drawW = img.width * scale;
    const drawH = img.height * scale;
    const dx = (target.width - drawW) / 2;
    const dy = (target.height - drawH) / 2;
    ctx.drawImage(img, dx, dy, drawW, drawH);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        setResultUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return URL.createObjectURL(blob);
        });
      },
      "image/jpeg",
      0.9
    );
  }, []);

  const handleFile = (file: File) => {
    const img = new Image();
    img.onload = () => {
      sourceImage.current = img;
      render(img, spec);
    };
    img.src = URL.createObjectURL(file);
  };

  const handleSpecChange = (key: string) => {
    setSpecKey(key);
    if (sourceImage.current) {
      const s = specs.find((x) => x.key === key)!;
      render(sourceImage.current, s);
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-500">
              <th className="py-2 pr-4">{t.specTitle}</th>
              <th className="py-2 pr-4">{t.ratio}</th>
              <th className="py-2">{t.size}</th>
            </tr>
          </thead>
          <tbody>
            {specs.map((s) => (
              <tr key={s.key} className="border-b border-slate-100">
                <td className="py-2 pr-4 font-medium text-slate-900">
                  {locale === "ko" ? s.ko : s.en}
                </td>
                <td className="py-2 pr-4 text-slate-600">{s.ratio}</td>
                <td className="py-2 text-slate-600">
                  {s.width} x {s.height}px
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <h3 className="font-semibold text-slate-900 mb-3">{t.uploadTitle}</h3>

        <label className="block text-xs text-slate-500 mb-1">{t.selectFormat}</label>
        <select
          value={specKey}
          onChange={(e) => handleSpecChange(e.target.value)}
          className="w-full sm:w-64 rounded-md border border-slate-300 p-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-slate-400"
        >
          {specs.map((s) => (
            <option key={s.key} value={s.key}>
              {locale === "ko" ? s.ko : s.en} ({s.width}x{s.height})
            </option>
          ))}
        </select>

        <div
          className="rounded-md border-2 border-dashed border-slate-300 p-8 text-center cursor-pointer hover:border-slate-400"
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files?.[0];
            if (file) handleFile(file);
          }}
        >
          <p className="text-slate-500 text-sm">{t.dropText}</p>
          <button
            type="button"
            className="mt-3 rounded-md bg-slate-900 text-white text-sm px-4 py-2 hover:bg-slate-700"
          >
            {t.chooseFile}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </div>

        {resultUrl && (
          <div className="mt-4 flex flex-col items-center gap-3">
            <NextImage
              src={resultUrl}
              alt="preview"
              width={spec.width}
              height={spec.height}
              className="max-w-full max-h-96 w-auto h-auto rounded-md border border-slate-200"
            />
            <a
              href={resultUrl}
              download={`instagram-${spec.key}.jpg`}
              className="rounded-md bg-slate-900 text-white text-sm px-4 py-2 hover:bg-slate-700"
            >
              {t.download}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
