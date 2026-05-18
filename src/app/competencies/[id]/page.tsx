import { notFound } from "next/navigation";
import Link from "next/link";
import { competencies, getCompetencyById } from "@/data/competencies";
import { staffRecords } from "@/data/staff";
import MandatoryBadge from "@/components/MandatoryBadge";
import StatusBadge from "@/components/StatusBadge";
import type { CompetencyStatus } from "@/types";

export function generateStaticParams() {
  return competencies.map((c) => ({ id: c.id }));
}

export default async function CompetencyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const competency = getCompetencyById(id);
  if (!competency) notFound();

  const records = staffRecords.filter((r) => r.competencyId === id);
  const statusCounts = (["Completed", "In Progress", "Expired", "Not Started"] as CompetencyStatus[]).map((status) => ({
    status,
    count: records.filter((r) => r.status === status).length,
  }));
  const completedCount = records.filter((r) => r.status === "Completed").length;
  const compliancePct = records.length > 0 ? Math.round((completedCount / records.length) * 100) : 0;

  return (
    <div>
      <nav style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#768692", marginBottom: 20 }}>
        <Link href="/competencies" style={{ color: "#005eb8" }}>Competencies</Link>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <span style={{ color: "#212b32" }}>{competency.name}</span>
      </nav>

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <span style={{ fontSize: 11, fontFamily: "monospace", color: "#768692", display: "block", marginBottom: 4 }}>{competency.id}</span>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#212b32", margin: 0 }}>{competency.name}</h1>
          <p style={{ fontSize: 13, color: "#768692", marginTop: 6 }}>{competency.category}</p>
        </div>
        <MandatoryBadge mandatory={competency.mandatory} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 24 }}>
        <div className="card" style={{ padding: 24 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#212b32", margin: "0 0 12px" }}>Description</h2>
          <p style={{ color: "#425563", lineHeight: 1.7, margin: 0 }}>{competency.description}</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 24 }}>
            {[
              { label: "Assessment Method", value: competency.assessmentMethod },
              { label: "Renewal Period", value: competency.renewalPeriod },
              { label: "Applicable Band", value: competency.band },
              { label: "Category", value: competency.category },
            ].map(({ label, value }) => (
              <div key={label}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#768692", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                  {label}
                </div>
                <div style={{ fontSize: 14, color: "#212b32", fontWeight: 500 }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#212b32", margin: "0 0 4px" }}>Compliance Summary</h2>
          {records.length === 0 ? (
            <p style={{ fontSize: 13, color: "#768692", marginTop: 12 }}>No staff records for this competency.</p>
          ) : (
            <>
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <div style={{ fontSize: 36, fontWeight: 700, color: compliancePct >= 75 ? "#007f3b" : compliancePct >= 50 ? "#fa8c00" : "#da291c" }}>
                  {compliancePct}%
                </div>
                <div style={{ fontSize: 12, color: "#768692" }}>compliance rate</div>
                <div className="progress-bar" style={{ marginTop: 10 }}>
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${compliancePct}%`,
                      background: compliancePct >= 75 ? "#007f3b" : compliancePct >= 50 ? "#fa8c00" : "#da291c",
                    }}
                  />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
                {statusCounts.map(({ status, count }) => (
                  <div key={status} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <StatusBadge status={status} />
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#212b32" }}>{count}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {records.length > 0 && (
        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #eaecef" }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: "#212b32", margin: 0 }}>Staff Records</h2>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#fafbfc", borderBottom: "1px solid #eaecef" }}>
                <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 600, color: "#425563", fontSize: 12 }}>Staff</th>
                <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 600, color: "#425563", fontSize: 12 }}>Role</th>
                <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 600, color: "#425563", fontSize: 12 }}>Ward</th>
                <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 600, color: "#425563", fontSize: 12 }}>Status</th>
                <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 600, color: "#425563", fontSize: 12 }}>Completed</th>
                <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 600, color: "#425563", fontSize: 12 }}>Expires</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, i) => (
                <tr key={`${r.staffId}-${i}`} className="table-row-hover" style={{ borderBottom: "1px solid #eaecef" }}>
                  <td style={{ padding: "10px 16px", fontWeight: 500, color: "#212b32" }}>{r.staffName}</td>
                  <td style={{ padding: "10px 16px", color: "#425563" }}>{r.role}</td>
                  <td style={{ padding: "10px 16px", color: "#425563" }}>{r.ward}</td>
                  <td style={{ padding: "10px 16px" }}><StatusBadge status={r.status} /></td>
                  <td style={{ padding: "10px 16px", color: "#425563" }}>{r.completionDate ?? "—"}</td>
                  <td style={{ padding: "10px 16px", color: r.status === "Expired" ? "#da291c" : "#425563" }}>{r.expiryDate ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
