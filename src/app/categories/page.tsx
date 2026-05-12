import Link from "next/link";
import { competencies, categories } from "@/data/competencies";

const categoryColours: Record<string, string> = {
  "Clinical Skills": "#005eb8",
  "Patient Safety": "#da291c",
  "Medicines Management": "#7c2d8e",
  "Infection Prevention & Control": "#00a499",
  "Communication": "#fa8c00",
  "Digital & Documentation": "#003087",
  "Emergency Response": "#da291c",
  "Safeguarding": "#ffb81c",
  "Leadership & Professional Practice": "#007f3b",
};

export default function CategoriesPage() {
  const categoryData = categories.map((cat) => {
    const comps = competencies.filter((c) => c.category === cat);
    return {
      name: cat,
      count: comps.length,
      mandatory: comps.filter((c) => c.mandatory).length,
      colour: categoryColours[cat] ?? "#005eb8",
      examples: comps.slice(0, 3).map((c) => c.name),
    };
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#212b32]">Competency Categories</h1>
        <p className="text-[#425563] mt-1">{categories.length} categories covering the full nursing competency framework</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categoryData.map((cat) => (
          <div key={cat.name} className="bg-white rounded shadow-sm overflow-hidden">
            <div className="h-2" style={{ backgroundColor: cat.colour }} />
            <div className="p-5">
              <h2 className="text-base font-bold text-[#212b32] mb-1">{cat.name}</h2>
              <div className="flex gap-4 text-sm text-[#768692] mb-4">
                <span><strong className="text-[#212b32]">{cat.count}</strong> competencies</span>
                <span><strong className="text-[#212b32]">{cat.mandatory}</strong> mandatory</span>
              </div>
              <div className="space-y-1 mb-4">
                {cat.examples.map((ex) => (
                  <div key={ex} className="text-xs text-[#425563] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: cat.colour }} />
                    {ex}
                  </div>
                ))}
                {cat.count > 3 && (
                  <div className="text-xs text-[#768692]">+{cat.count - 3} more&hellip;</div>
                )}
              </div>
              <Link
                href={`/competencies?category=${encodeURIComponent(cat.name)}`}
                className="text-sm font-semibold no-underline"
                style={{ color: cat.colour, textDecoration: "none" }}
              >
                View all {cat.name} competencies &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
