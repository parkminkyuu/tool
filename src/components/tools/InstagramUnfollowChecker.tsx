"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/locales";

const strings = {
  ko: {
    howTo: "파일은 어떻게 받나요?",
    steps: [
      "인스타그램 앱 → 프로필 → ☰ 메뉴 → 설정 및 개인정보 → 계정 센터",
      "'내 정보 및 권한' → '정보 다운로드' 선택",
      "다운로드 항목에서 '팔로워 및 팔로우 중'만 선택, 형식은 'JSON'으로 지정 후 요청",
      "이메일/알림으로 받은 다운로드 링크에서 followers_1.json, following.json 파일을 저장",
    ],
    followersLabel: "followers_1.json (내 팔로워)",
    followingLabel: "following.json (내가 팔로우)",
    dropText: "파일을 선택하거나 드래그하세요",
    chooseFile: "파일 선택",
    loaded: (n: number) => `${n}명 불러옴`,
    notFollowingBack: "내가 팔로우하지만 나를 팔로우하지 않는 계정",
    notFollowedBack: "나를 팔로우하지만 내가 팔로우하지 않는 계정",
    searchPlaceholder: "아이디 검색...",
    copyAll: "전체 복사",
    copied: "복사됨!",
    noResult: "결과가 없습니다.",
    privacyNote: "업로드한 파일은 서버로 전송되지 않으며 브라우저에서만 처리됩니다.",
    parseError: "파일을 읽을 수 없습니다. 인스타그램에서 받은 JSON 파일이 맞는지 확인해주세요.",
    needBoth: "두 파일을 모두 업로드하면 결과가 표시됩니다.",
  },
  en: {
    howTo: "How do I get these files?",
    steps: [
      "Instagram app → Profile → ☰ Menu → Settings and privacy → Accounts Center",
      "Go to 'Your information and permissions' → 'Download your information'",
      "Select only 'Followers and following', choose format 'JSON', and request the download",
      "From the email/notification link, save the followers_1.json and following.json files",
    ],
    followersLabel: "followers_1.json (your followers)",
    followingLabel: "following.json (accounts you follow)",
    dropText: "Choose a file or drag it here",
    chooseFile: "Choose file",
    loaded: (n: number) => `${n} accounts loaded`,
    notFollowingBack: "Accounts you follow that don't follow you back",
    notFollowedBack: "Accounts that follow you but you don't follow back",
    searchPlaceholder: "Search username...",
    copyAll: "Copy all",
    copied: "Copied!",
    noResult: "No results.",
    privacyNote: "Uploaded files are never sent to a server — everything is processed in your browser.",
    parseError: "Couldn't read this file. Please make sure it's the JSON file from Instagram's data export.",
    needBoth: "Upload both files to see the results.",
  },
} as const;

type Entry = { value?: string; href?: string };
type ListItem = { string_list_data?: Entry[]; title?: string };

function extractUsernames(data: unknown): string[] {
  let list: ListItem[] | null = null;

  if (Array.isArray(data)) {
    list = data as ListItem[];
  } else if (data && typeof data === "object") {
    for (const value of Object.values(data as Record<string, unknown>)) {
      if (Array.isArray(value)) {
        list = value as ListItem[];
        break;
      }
    }
  }

  if (!list) return [];

  return list
    .map((item) => item.string_list_data?.[0]?.value ?? item.title)
    .filter((v): v is string => typeof v === "string" && v.length > 0);
}

function FileDropZone({
  label,
  loadedCount,
  loadedLabel,
  onFile,
  error,
}: {
  label: string;
  loadedCount: number | null;
  loadedLabel: string;
  onFile: (file: File) => void;
  error: string | null;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
      <div className="rounded-md border-2 border-dashed border-slate-300 p-6 text-center hover:border-slate-400">
        <input
          type="file"
          accept="application/json,.json"
          id={`file-${label}`}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onFile(file);
          }}
        />
        <label
          htmlFor={`file-${label}`}
          className="cursor-pointer inline-block rounded-md bg-slate-900 text-white text-sm px-4 py-2 hover:bg-slate-700"
        >
          {label}
        </label>
        {loadedCount !== null && (
          <p className="mt-2 text-sm text-green-600">{loadedLabel}</p>
        )}
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}

export default function InstagramUnfollowChecker({ locale }: { locale: Locale }) {
  const t = strings[locale];
  const [followers, setFollowers] = useState<string[] | null>(null);
  const [following, setFollowing] = useState<string[] | null>(null);
  const [followersError, setFollowersError] = useState<string | null>(null);
  const [followingError, setFollowingError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const loadFile = (
    file: File,
    setList: (v: string[]) => void,
    setError: (v: string | null) => void
  ) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        const usernames = extractUsernames(parsed);
        if (usernames.length === 0) throw new Error("empty");
        setList(usernames);
        setError(null);
      } catch {
        setError(t.parseError);
      }
    };
    reader.readAsText(file);
  };

  const notFollowingBack = useMemo(() => {
    if (!followers || !following) return null;
    const followerSet = new Set(followers.map((f) => f.toLowerCase()));
    return following.filter((f) => !followerSet.has(f.toLowerCase())).sort();
  }, [followers, following]);

  const notFollowedBack = useMemo(() => {
    if (!followers || !following) return null;
    const followingSet = new Set(following.map((f) => f.toLowerCase()));
    return followers.filter((f) => !followingSet.has(f.toLowerCase())).sort();
  }, [followers, following]);

  const filterList = (list: string[]) =>
    query.trim() === ""
      ? list
      : list.filter((u) => u.toLowerCase().includes(query.trim().toLowerCase()));

  const copyList = async (list: string[], key: string) => {
    await navigator.clipboard.writeText(list.join("\n"));
    setCopied(key);
    setTimeout(() => setCopied((c) => (c === key ? null : c)), 1500);
  };

  return (
    <div>
      <details className="mb-6 rounded-md border border-slate-200 p-4">
        <summary className="cursor-pointer font-medium text-slate-900">{t.howTo}</summary>
        <ol className="mt-3 list-decimal list-inside space-y-1 text-sm text-slate-600">
          {t.steps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </details>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FileDropZone
          label={t.followersLabel}
          loadedCount={followers?.length ?? null}
          loadedLabel={t.loaded(followers?.length ?? 0)}
          error={followersError}
          onFile={(f) => loadFile(f, setFollowers, setFollowersError)}
        />
        <FileDropZone
          label={t.followingLabel}
          loadedCount={following?.length ?? null}
          loadedLabel={t.loaded(following?.length ?? 0)}
          error={followingError}
          onFile={(f) => loadFile(f, setFollowing, setFollowingError)}
        />
      </div>

      <p className="mt-3 text-xs text-slate-400">{t.privacyNote}</p>

      {!followers || !following ? (
        <p className="mt-8 text-sm text-slate-500">{t.needBoth}</p>
      ) : (
        <>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="mt-6 w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
          <ResultSection
            title={t.notFollowingBack}
            list={filterList(notFollowingBack ?? [])}
            id="notFollowingBack"
            copiedId={copied}
            onCopy={copyList}
            copyLabel={t.copyAll}
            copiedLabel={t.copied}
            noResultLabel={t.noResult}
          />
          <ResultSection
            title={t.notFollowedBack}
            list={filterList(notFollowedBack ?? [])}
            id="notFollowedBack"
            copiedId={copied}
            onCopy={copyList}
            copyLabel={t.copyAll}
            copiedLabel={t.copied}
            noResultLabel={t.noResult}
          />
        </>
      )}
    </div>
  );
}

function ResultSection({
  title,
  list,
  id,
  copiedId,
  onCopy,
  copyLabel,
  copiedLabel,
  noResultLabel,
}: {
  title: string;
  list: string[];
  id: string;
  copiedId: string | null;
  onCopy: (list: string[], id: string) => void;
  copyLabel: string;
  copiedLabel: string;
  noResultLabel: string;
}) {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-slate-900">
          {title} <span className="text-slate-400 font-normal">({list.length})</span>
        </h3>
        {list.length > 0 && (
          <button
            onClick={() => onCopy(list, id)}
            className="text-xs rounded-md border border-slate-300 px-2.5 py-1.5 hover:bg-slate-50"
          >
            {copiedId === id ? copiedLabel : copyLabel}
          </button>
        )}
      </div>
      {list.length === 0 ? (
        <p className="text-sm text-slate-400">{noResultLabel}</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-80 overflow-y-auto">
          {list.map((u) => (
            <a
              key={u}
              href={`https://instagram.com/${u}`}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="truncate rounded-md border border-slate-200 px-2.5 py-1.5 text-sm text-slate-700 hover:border-slate-400"
            >
              @{u}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
