import { staffRecords, getStaffSummaries } from "@/data/staff";
import { getCompetencyById } from "@/data/competencies";
import StatusBadge from "@/components/StatusBadge";
import StatCard from "@/components/StatCard";

export default function StaffPage() {
  const summaries = getStaffSummaries();
  const totalRecords = staffRecords.length;
  const expired = staffRecords.filter((r) => r.status === "Expired").length;
  const notStarted = staffRecords.filter((r) => r.status === "Not Started").length;
  const completed = staffRecords.filter((r) => r.status === "Completed").length;

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#212b32", margin: 0 }}>Staff Competency Matrix</h1>
        <p style={{ fontSize: 13, color: "#768692", marginTop: 4 }}>
          Competency status for {summaries.length} tracked staff members
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        <StatCard
          label="Staff Members"
          value={summaries.length}
          colour="#005eb8"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
        />
        <StatCard
          label="Completed Records"
          value={completed}
          colour="#007f3b"
          subtext={`of ${totalRecords} total`}
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
        />
        <StatCard
          label="Expired Records"
          value={expired}
          colour="#da291c"
          subtext="Require renewal"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>}
        />
        <StatCard
          label="Not Started"
          value={notStarted}
          colour="#768692"
          subtext="Awaiting completion"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {summaries.map((staff) => {
          const records = staffRecords.filter((r) => r.staffId === staff.staffId);
          const pct = Math.round((staff.completed / staff.total) * 100);
          const pctColor = pct >= 80 ? "#007f3b" : pct >= 50 ? "#fa8c00" : "#da291c";

          return (
            <div key={staff.staffId} className="card" style={{ overflow: "hidden" }}>
              <div
                style={{
                  padding: "16px 20px",
                  borderBottom: "1px solid #eaecef",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "#f0f4fb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: 14,
                      color: "#005eb8",
                      flexShrink: 0,
                    }}
                  >
                    {staff.staffName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#212b32" }}>{staff.staffName}</div>
                    <div style={{ fontSize: 12, color: "#768692" }}>{staff.role} &mdash; {staff.ward}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: pctColor, lineHeight: 1 }}>{pct}%</div>
                    <div style={{ fontSize: 11, color: "#768692", marginTop: 2 }}>
                      {staff.completed}/{staff.total} completed
                    </div>
                  </div>
                  <div style={{ width: 80 }}>
                    <div className="progress-bar">
                      <div className="progress-bar-fill" style={{ width: `${pct}%`, background: pctColor }} />
                    </div>
                  </div>
                </div>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#fafbfc", borderBottom: "1px solid #eaecef" }}>
                    <th style={{ padding: "9px 16px", textAlign: "left", fontWeight: 600, color: "#425563", fontSize: 12 }}>Competency</th>
                    <th style={{ padding: "9px 16px", textAlign: "left", fontWeight: 600, color: "#425563", fontSize: 12 }}>Status</th>
                    <th style={{ padding: "9px 16px", textAlign: "left", fontWeight: 600, color: "#425563", fontSize: 12 }}>Completed</th>
                    <th style={{ padding: "9px 16px", textAlign: "left", fontWeight: 600, color: "#425563", fontSize: 12 }}>Expires</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((r, i) => {
                    const comp = getCompetencyById(r.competencyId);
                    return (
                      <tr key={i} className="table-row-hover" style={{ borderBottom: "1px solid #eaecef" }}>
                        <td style={{ padding: "10px 16px" }}>
                          <div style={{ fontWeight: 500, color: "#212b32" }}>{comp?.name ?? r.competencyId}</div>
                          <div style={{ fontSize: 11, color: "#768692", fontFamily: "monospace" }}>{r.competencyId}</div>
                        </td>
                        <td style={{ padding: "10px 16px" }}><StatusBadge status={r.status} /></td>
                        <td style={{ padding: "10px 16px", color: "#425563", fontSize: 12 }}>{r.completionDate ?? "—"}</td>
                        <td style={{ padding: "10px 16px", color: r.expiryDate ? "#212b32" : "#768692", fontSize: 12 }}>{r.expiryDate ?? "—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
}
