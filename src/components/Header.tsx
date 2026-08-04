import Link from "next/link";
import type { Locale } from "@/lib/locales";
import type { Dictionary } from "@/lib/dictionary";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <header className="border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <span className="text-xl font-bold text-slate-900">
            🧰 {dict.siteName}
          </span>
        </Link>
        <LocaleSwitcher locale={locale} />
      </div>
    </header>
  );
}
