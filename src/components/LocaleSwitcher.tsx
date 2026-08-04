"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/locales";

const labels: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
};

export default function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}`;
  const rest = pathname.replace(/^\/(ko|en)/, "") || "";

  return (
    <div className="flex items-center gap-1 text-sm">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-slate-300">/</span>}
          <Link
            href={`/${l}${rest}`}
            className={
              l === locale
                ? "font-semibold text-slate-900"
                : "text-slate-500 hover:text-slate-900"
            }
          >
            {labels[l]}
          </Link>
        </span>
      ))}
    </div>
  );
}
