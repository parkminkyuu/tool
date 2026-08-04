import Link from "next/link";
import type { Locale } from "@/lib/locales";
import type { ToolMeta } from "@/lib/tools-registry";

export default function ToolCard({
  tool,
  locale,
}: {
  tool: ToolMeta;
  locale: Locale;
}) {
  const t = tool[locale];
  return (
    <Link
      href={`/${locale}/tools/${tool.slug}`}
      className="group block rounded-lg border border-slate-200 p-4 hover:border-slate-400 hover:shadow-sm transition"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl leading-none" aria-hidden>
          {tool.icon}
        </span>
        <div>
          <h3 className="font-semibold text-slate-900 group-hover:underline">
            {t.name}
          </h3>
          <p className="text-sm text-slate-500 mt-1">{t.shortDesc}</p>
        </div>
      </div>
    </Link>
  );
}
