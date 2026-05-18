import { competencies, categories } from "@/data/competencies";
import { staffRecords, getStaffSummaries } from "@/data/staff";
import { roleMappings } from "@/data/roles";
import StatCard from "@/components/StatCard";
import StatusBadge from "@/components/StatusBadge";
import type { CompetencyStatus } from "@/types";

export default function ReportsPage() {
  const summaries = getStaffSummaries();
  const totalRecords = staffRecords.length;
  const completed = staffRecords.filter((r) => r.status === "Completed").length;
  const expired = staffRecords.filter((r) => r.status === "Expired").length;
  const inProgress = staffRecords.filter((r) => r.status === "In Progress").length;
  const notStarted = staffRecords.filter((r) => r.status === "Not Started").length;
  const complianceRate = Math.round((completed / totalRecords) * 100);

  const statusBreakdown: { status: CompetencyStatus; count: number; pct: number; color: string }[] = [
    { status: "Completed", count: completed, pct: Math.round((completed / totalRecords) * 100), color: "#007f3b" },
    { status: "In Progress", count: inProgress, pct: Math.round((inProgress / totalRecords) * 100), color: "#ffb81c" },
    { status: "Expired", count: expired, pct: Math.round((expired / totalRecords) * 100), color: "#da291c" },
    { status: "Not Started", count: notStarted, pct: Math.round((notStarted / totalRecords) * 100), color: "#768692" },
  ];

  const categoryBreakdown = categories.map((cat) => {
    const catComps = competencies.filter((c) => c.category === cat);
    const catRecords = staffRecords.filter((r) => catComps.some((c) => c.id === r.competencyId));
    const catCompleted = catRecords.filter((r) => r.status === "Completed").length;
    return {
      name: cat,
      total: catRecords.length,
      completed: catCompleted,
      pct: catRecords.length > 0 ? Math.round((catCompleted / catRecords.length) * 100) : 0,
    };
  }).filter((c) => c.total > 0);

  const wardBreakdown = Array.from(new Set(staffRecords.map((r) => r.ward))).map((ward) => {
    const wardRecords = staffRecords.filter((r) => r.ward === ward);
    const wardCompleted = wardRecords.filter((r) => r.status === "Completed").length;
    const wardExpired = wardRecords.filter((r) => r.status === "Expired").length;
    return {
      ward,
      total: wardRecords.length,
      completed: wardCompleted,
      expired: wardExpired,
      pct: Math.round((wardCompleted / wardRecords.length) * 100),
    };
  }).sort((a, b) => b.pct - a.pct);

  const rateColor = (pct: number) => pct >= 75 ? "#007f3b" : pct >= 50 ? "#fa8c00" : "#da291c";

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#212b32", margin: 0 }}>Compliance Reports</h1>
        <p style={{ fontSize: 13, color: "#768692", marginTop: 4 }}>
          Framework-wide compliance and audit readiness overview
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        <StatCard
          label="Overall Compliance"
          value={`${complianceRate}%`}
          colour="#007f3b"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>}
        />
        <StatCard
          label="Completed"
          value={completed}
          colour="#007f3b"
          subtext={`of ${totalRecords} total records`}
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
        />
        <StatCard
          label="Expired"
          value={expired}
          colour="#da291c"
          subtext="Require renewal"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>}
        />
        <StatCard
          label="Not Started"
          value={notStarted}
          colour="#768692"
          subtext="No action taken"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <div className="card" style={{ padding: 24 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#212b32", margin: "0 0 20px" }}>Status Breakdown</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {statusBreakdown.map(({ status, count, pct, color }) => (
              <div key={status}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <StatusBadge status={status} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#212b32" }}>{count} <span style={{ color: "#768692", fontWeight: 400 }}>({pct}%)</span></span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${pct}%`, background: color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#212b32", margin: "0 0 20px" }}>Compliance by Ward</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {wardBreakdown.map((w) => (
              <div key={w.ward}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "#212b32" }}>{w.ward}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {w.expired > 0 && (
                      <span style={{ fontSize: 11, color: "#da291c", fontWeight: 600 }}>{w.expired} expired</span>
                    )}
                    <span style={{ fontSize: 13, fontWeight: 700, color: rateColor(w.pct) }}>{w.pct}%</span>
                  </div>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${w.pct}%`, background: rateColor(w.pct) }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 24, marginBottom: 20 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: "#212b32", margin: "0 0 16px" }}>Compliance by Category</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #eaecef" }}>
              <th style={{ textAlign: "left", padding: "8px 12px", fontWeight: 600, color: "#425563", fontSize: 12 }}>Category</th>
              <th style={{ textAlign: "right", padding: "8px 12px", fontWeight: 600, color: "#425563", fontSize: 12 }}>Records</th>
              <th style={{ textAlign: "right", padding: "8px 12px", fontWeight: 600, color: "#425563", fontSize: 12 }}>Completed</th>
              <th style={{ textAlign: "right", padding: "8px 12px", fontWeight: 600, color: "#425563", fontSize: 12 }}>Rate</th>
              <th style={{ padding: "8px 12px", width: 120 }} />
            </tr>
          </thead>
          <tbody>
            {categoryBreakdown.sort((a, b) => b.pct - a.pct).map((cat) => (
              <tr key={cat.name} className="table-row-hover" style={{ borderBottom: "1px solid #eaecef" }}>
                <td style={{ padding: "11px 12px", fontWeight: 500, color: "#212b32" }}>{cat.name}</td>
                <td style={{ padding: "11px 12px", textAlign: "right", color: "#768692" }}>{cat.total}</td>
                <td style={{ padding: "11px 12px", textAlign: "right", color: "#007f3b", fontWeight: 600 }}>{cat.completed}</td>
                <td style={{ padding: "11px 12px", textAlign: "right", fontWeight: 700, color: rateColor(cat.pct) }}>{cat.pct}%</td>
                <td style={{ padding: "11px 12px" }}>
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: `${cat.pct}%`, background: rateColor(cat.pct) }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: "#212b32", margin: "0 0 16px" }}>Role Competency Requirements</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
          {roleMappings.map((role) => (
            <div
              key={role.role}
              style={{
                border: "1px solid #eaecef",
                borderRadius: 8,
                padding: "16px",
                background: "#fafbfc",
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 13, color: "#212b32" }}>{role.role}</div>
              <div style={{ fontSize: 11, color: "#768692", marginTop: 2 }}>{role.bands}</div>
              <div style={{ fontSize: 12, color: "#425563", marginTop: 8, lineHeight: 1.5 }}>{role.description}</div>
              <div style={{ marginTop: 12, display: "flex", alignItems: "baseline", gap: 4 }}>
                <span style={{ fontSize: 24, fontWeight: 700, color: "#005eb8" }}>{role.mandatoryCount}</span>
                <span style={{ fontSize: 12, color: "#768692" }}>mandatory competencies</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
