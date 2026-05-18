import Link from "next/link";
import { competencies, categories } from "@/data/competencies";

const categoryColors: Record<string, string> = {
  "Clinical Skills": "#005eb8",
  "Patient Safety": "#da291c",
  "Medicines Management": "#7c2d8e",
  "Infection Prevention & Control": "#00a499",
  "Communication": "#fa8c00",
  "Digital & Documentation": "#003087",
  "Emergency Response": "#e85c00",
  "Safeguarding": "#b88600",
  "Leadership & Professional Practice": "#007f3b",
};

const categoryIcons: Record<string, string> = {
  "Clinical Skills": "🩺",
  "Patient Safety": "🛡️",
  "Medicines Management": "💊",
  "Infection Prevention & Control": "🧤",
  "Communication": "💬",
  "Digital & Documentation": "💻",
  "Emergency Response": "🚨",
  "Safeguarding": "⚖️",
  "Leadership & Professional Practice": "👥",
};

export default function CategoriesPage() {
  const categoryData = categories.map((cat) => {
    const comps = competencies.filter((c) => c.category === cat);
    return {
      name: cat,
      count: comps.length,
      mandatory: comps.filter((c) => c.mandatory).length,
      optional: comps.filter((c) => !c.mandatory).length,
      colour: categoryColors[cat] ?? "#005eb8",
      icon: categoryIcons[cat] ?? "📋",
      examples: comps.slice(0, 3).map((c) => c.name),
    };
  });

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#212b32", margin: 0 }}>Competency Categories</h1>
        <p style={{ fontSize: 13, color: "#768692", marginTop: 4 }}>
          {categories.length} categories covering the full nursing competency framework
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
        {categoryData.map((cat) => (
          <div
            key={cat.name}
            className="card card-hover"
            style={{ overflow: "hidden" }}
          >
            <div style={{ height: 4, background: cat.colour }} />
            <div style={{ padding: "20px 20px 16px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 10,
                    background: `${cat.colour}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    flexShrink: 0,
                  }}
                >
                  {cat.icon}
                </div>
                <div>
                  <h2 style={{ fontSize: 14, fontWeight: 700, color: "#212b32", margin: 0, lineHeight: 1.3 }}>{cat.name}</h2>
                  <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
                    <span style={{ fontSize: 12, color: "#768692" }}>
                      <strong style={{ color: "#212b32" }}>{cat.count}</strong> total
                    </span>
                    <span style={{ fontSize: 12, color: "#768692" }}>
                      <strong style={{ color: "#005eb8" }}>{cat.mandatory}</strong> mandatory
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                {cat.examples.map((ex) => (
                  <div
                    key={ex}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "4px 0",
                      fontSize: 12,
                      color: "#425563",
                      borderBottom: "1px solid #f0f2f4",
                    }}
                  >
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: cat.colour, flexShrink: 0 }} />
                    {ex}
                  </div>
                ))}
                {cat.count > 3 && (
                  <div style={{ fontSize: 11, color: "#768692", marginTop: 6 }}>+{cat.count - 3} more competencies</div>
                )}
              </div>

              <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                <div style={{ flex: 1, height: 4, borderRadius: 2, background: "#eaecef", overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      borderRadius: 2,
                      background: cat.colour,
                      width: `${Math.round((cat.mandatory / cat.count) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              <Link
                href={`/competencies?category=${encodeURIComponent(cat.name)}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: 12,
                  fontWeight: 600,
                  color: cat.colour,
                  textDecoration: "none",
                }}
              >
                View all competencies
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
