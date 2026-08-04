import type { Locale } from "@/lib/locales";
import type { Dictionary } from "@/lib/dictionary";
import { getToolsByCategory, type ToolMeta } from "@/lib/tools-registry";
import ToolCard from "./ToolCard";

export default function RelatedTools({
  tool,
  locale,
  dict,
}: {
  tool: ToolMeta;
  locale: Locale;
  dict: Dictionary;
}) {
  const related = getToolsByCategory(tool.category).filter(
    (t) => t.slug !== tool.slug
  );
  if (related.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-lg font-bold text-slate-900 mb-4">
        {dict.common.relatedTools}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {related.map((t) => (
          <ToolCard key={t.slug} tool={t} locale={locale} />
        ))}
      </div>
    </section>
  );
}
