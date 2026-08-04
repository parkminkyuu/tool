import type { Locale } from "@/lib/locales";
import type { Dictionary } from "@/lib/dictionary";
import { getToolsByCategory, type ToolCategory } from "@/lib/tools-registry";
import ToolCard from "./ToolCard";

export default function CategorySection({
  category,
  locale,
  dict,
}: {
  category: ToolCategory;
  locale: Locale;
  dict: Dictionary;
}) {
  const toolsInCategory = getToolsByCategory(category);
  if (toolsInCategory.length === 0) return null;

  return (
    <section className="mb-10">
      <h2 className="text-lg font-bold text-slate-900 mb-1">
        {dict.categories[category]}
      </h2>
      <p className="text-sm text-slate-500 mb-4">
        {dict.categoryDescriptions[category]}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {toolsInCategory.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} locale={locale} />
        ))}
      </div>
    </section>
  );
}
