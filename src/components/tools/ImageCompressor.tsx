"use client";

import { useCallback, useRef, useState } from "react";
import type { Locale } from "@/lib/locales";

const strings = {
  ko: {
    dropText: "이미지를 선택하거나 여기로 드래그하세요",
    chooseFile: "파일 선택",
    quality: "품질",
    maxWidth: "최대 너비 (px)",
    format: "출력 형식",
    original: "원본 크기",
    compressed: "압축 후 크기",
    reduction: "용량 절감",
    download: "다운로드",
    processing: "처리 중...",
  },
  en: {
    dropText: "Choose an image or drag it here",
    chooseFile: "Choose file",
    quality: "Quality",
    maxWidth: "Max width (px)",
    format: "Output format",
    original: "Original size",
    compressed: "Compressed size",
    reduction: "Size reduction",
    download: "Download",
    processing: "Processing...",
  },
} as const;

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ImageCompressor({ locale }: { locale: Locale }) {
  const t = strings[locale];
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState<number | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [maxWidth, setMaxWidth] = useState(1600);
  const [format, setFormat] = useState<"image/jpeg" | "image/webp" | "image/png">(
    "image/jpeg"
  );
  const [fileName, setFileName] = useState("image");
  const [processing, setProcessing] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const sourceImage = useRef<HTMLImageElement | null>(null);

  const process = useCallback(
    (img: HTMLImageElement, q: number, w: number, f: string) => {
      const scale = Math.min(1, w / img.width);
      const targetW = Math.round(img.width * scale);
      const targetH = Math.round(img.height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, targetW, targetH);
      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          setResultUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return URL.createObjectURL(blob);
          });
          setResultSize(blob.size);
          setProcessing(false);
        },
        f,
        f === "image/png" ? undefined : q
      );
    },
    []
  );

  const handleFile = (file: File) => {
    setFileName(file.name.replace(/\.[^/.]+$/, ""));
    setOriginalSize(file.size);
    setProcessing(true);
    const img = new Image();
    img.onload = () => {
      sourceImage.current = img;
      process(img, quality, maxWidth, format);
    };
    img.src = URL.createObjectURL(file);
  };

  const reprocess = (q: number, w: number, f: string) => {
    if (!sourceImage.current) return;
    setProcessing(true);
    process(sourceImage.current, q, w, f);
  };

  const ext = format === "image/jpeg" ? "jpg" : format === "image/webp" ? "webp" : "png";

  return (
    <div>
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

      {originalSize !== null && (
        <div className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-slate-500 mb-1">
                {t.quality}: {Math.round(quality * 100)}%
              </label>
              <input
                type="range"
                min={0.1}
                max={1}
                step={0.05}
                value={quality}
                disabled={format === "image/png"}
                onChange={(e) => {
                  const q = parseFloat(e.target.value);
                  setQuality(q);
                  reprocess(q, maxWidth, format);
                }}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">
                {t.maxWidth}
              </label>
              <input
                type="number"
                value={maxWidth}
                onChange={(e) => {
                  const w = parseInt(e.target.value, 10) || 1;
                  setMaxWidth(w);
                  reprocess(quality, w, format);
                }}
                className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">
                {t.format}
              </label>
              <select
                value={format}
                onChange={(e) => {
                  const f = e.target.value as typeof format;
                  setFormat(f);
                  reprocess(quality, maxWidth, f);
                }}
                className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                <option value="image/jpeg">JPEG</option>
                <option value="image/webp">WebP</option>
                <option value="image/png">PNG</option>
              </select>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-md border border-slate-200 p-3">
              <div className="text-sm font-semibold text-slate-900">
                {formatBytes(originalSize)}
              </div>
              <div className="text-xs text-slate-500 mt-1">{t.original}</div>
            </div>
            <div className="rounded-md border border-slate-200 p-3">
              <div className="text-sm font-semibold text-slate-900">
                {processing
                  ? t.processing
                  : resultSize !== null
                  ? formatBytes(resultSize)
                  : "-"}
              </div>
              <div className="text-xs text-slate-500 mt-1">{t.compressed}</div>
            </div>
            <div className="rounded-md border border-slate-200 p-3">
              <div className="text-sm font-semibold text-green-600">
                {resultSize !== null && !processing
                  ? `-${Math.max(
                      0,
                      Math.round((1 - resultSize / originalSize) * 100)
                    )}%`
                  : "-"}
              </div>
              <div className="text-xs text-slate-500 mt-1">{t.reduction}</div>
            </div>
          </div>

          {resultUrl && (
            <div className="mt-4 flex flex-col items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resultUrl}
                alt="preview"
                className="max-w-full max-h-80 rounded-md border border-slate-200"
              />
              <a
                href={resultUrl}
                download={`${fileName}-compressed.${ext}`}
                className="rounded-md bg-slate-900 text-white text-sm px-4 py-2 hover:bg-slate-700"
              >
                {t.download}
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
