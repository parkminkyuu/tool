import Link from "next/link";
import type { Locale } from "@/lib/locales";
import type { Dictionary } from "@/lib/dictionary";

export default function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <footer className="border-t border-slate-200 mt-12">
      <div className="max-w-5xl mx-auto px-4 py-8 text-sm text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>{dict.footer.madeWith}</p>
        <div className="flex items-center gap-4">
          <Link href={`/${locale}`} className="hover:text-slate-900">
            {dict.footer.allTools}
          </Link>
          <Link href={`/${locale}/privacy`} className="hover:text-slate-900">
            {dict.footer.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
}
