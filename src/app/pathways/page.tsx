import { pathways } from "@/data/pathways";
import { getCompetencyById } from "@/data/competencies";
import Link from "next/link";
import MandatoryBadge from "@/components/MandatoryBadge";

const pathwayColors = ["#005eb8", "#00a499", "#7c2d8e", "#fa8c00", "#007f3b"];

export default function PathwaysPage() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#212b32", margin: 0 }}>Learning Pathways</h1>
        <p style={{ fontSize: 13, color: "#768692", marginTop: 4 }}>
          Structured competency sequences for different nursing roles
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {pathways.map((pathway, pi) => {
          const colour = pathwayColors[pi % pathwayColors.length];
          const comps = pathway.competencyIds.map(getCompetencyById).filter(Boolean);
          const mandatory = comps.filter((c) => c!.mandatory).length;

          return (
            <div key={pathway.id} className="card" style={{ overflow: "hidden" }}>
              <div style={{ height: 4, background: colour }} />
              <div
                style={{
                  padding: "20px 24px",
                  borderBottom: "1px solid #eaecef",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <div>
                  <span style={{ fontSize: 11, fontFamily: "monospace", color: "#768692" }}>{pathway.id}</span>
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: "#212b32", margin: "4px 0 6px" }}>{pathway.name}</h2>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#768692" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    </svg>
                    <span style={{ fontSize: 13, color: "#768692" }}>
                      Target: <strong style={{ color: "#425563" }}>{pathway.targetRole}</strong>
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 20 }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 26, fontWeight: 700, color: colour }}>{comps.length}</div>
                    <div style={{ fontSize: 11, color: "#768692" }}>competencies</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 26, fontWeight: 700, color: "#005eb8" }}>{mandatory}</div>
                    <div style={{ fontSize: 11, color: "#768692" }}>mandatory</div>
                  </div>
                </div>
              </div>

              <div style={{ padding: "20px 24px" }}>
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      left: 13,
                      top: 28,
                      bottom: 28,
                      width: 2,
                      background: `${colour}30`,
                    }}
                  />
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {comps.map((comp, idx) => (
                      <div key={comp!.id} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                        <div
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            background: colour,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontSize: 11,
                            fontWeight: 700,
                            flexShrink: 0,
                            position: "relative",
                            zIndex: 1,
                          }}
                        >
                          {idx + 1}
                        </div>
                        <div
                          style={{
                            flex: 1,
                            background: "#f8fafc",
                            border: "1px solid #eaecef",
                            borderRadius: 8,
                            padding: "10px 14px",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
                            <Link
                              href={`/competencies/${comp!.id}`}
                              style={{ fontWeight: 600, color: "#005eb8", fontSize: 13 }}
                            >
                              {comp!.name}
                            </Link>
                            <MandatoryBadge mandatory={comp!.mandatory} />
                          </div>
                          <div style={{ display: "flex", gap: 12, marginTop: 4, flexWrap: "wrap" }}>
                            <span style={{ fontSize: 11, color: "#768692" }}>{comp!.category}</span>
                            <span style={{ fontSize: 11, color: "#768692" }}>·</span>
                            <span style={{ fontSize: 11, color: "#768692" }}>{comp!.assessmentMethod}</span>
                            <span style={{ fontSize: 11, color: "#768692" }}>·</span>
                            <span style={{ fontSize: 11, color: "#768692" }}>{comp!.renewalPeriod}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
