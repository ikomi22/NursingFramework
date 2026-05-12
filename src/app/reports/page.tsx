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

  const statusBreakdown: { status: CompetencyStatus; count: number; pct: number }[] = [
    { status: "Completed", count: completed, pct: Math.round((completed / totalRecords) * 100) },
    { status: "In Progress", count: inProgress, pct: Math.round((inProgress / totalRecords) * 100) },
    { status: "Expired", count: expired, pct: Math.round((expired / totalRecords) * 100) },
    { status: "Not Started", count: notStarted, pct: Math.round((notStarted / totalRecords) * 100) },
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
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#212b32]">Compliance Reports</h1>
        <p className="text-[#425563] mt-1">Framework-wide compliance and audit readiness overview</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Overall Compliance" value={`${complianceRate}%`} colour="#007f3b" />
        <StatCard label="Completed Records" value={completed} colour="#007f3b" subtext={`of ${totalRecords} total`} />
        <StatCard label="Expired Records" value={expired} colour="#da291c" subtext="Require renewal" />
        <StatCard label="Not Started" value={notStarted} colour="#768692" subtext="No action taken" />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded shadow-sm p-6">
          <h2 className="text-base font-bold text-[#212b32] mb-4">Status Breakdown</h2>
          <div className="space-y-4">
            {statusBreakdown.map(({ status, count, pct }) => (
              <div key={status}>
                <div className="flex justify-between items-center mb-1">
                  <StatusBadge status={status} />
                  <span className="text-sm font-semibold text-[#212b32]">{count} ({pct}%)</span>
                </div>
                <div className="h-2 bg-[#e8edee] rounded overflow-hidden">
                  <div
                    className="h-full rounded"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: status === "Completed" ? "#007f3b" : status === "Expired" ? "#da291c" : status === "In Progress" ? "#ffb81c" : "#768692",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded shadow-sm p-6">
          <h2 className="text-base font-bold text-[#212b32] mb-4">Compliance by Ward</h2>
          <div className="space-y-3">
            {wardBreakdown.map((w) => (
              <div key={w.ward}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-[#212b32]">{w.ward}</span>
                  <span className="text-[#768692]">{w.pct}% &mdash; {w.expired > 0 && <span className="text-[#da291c]">{w.expired} expired</span>}</span>
                </div>
                <div className="h-2 bg-[#e8edee] rounded overflow-hidden">
                  <div className="h-full bg-[#005eb8] rounded" style={{ width: `${w.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded shadow-sm p-6 mb-8">
        <h2 className="text-base font-bold text-[#212b32] mb-4">Compliance by Category</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-[#003087]">
                <th className="text-left py-2 font-semibold text-[#425563]">Category</th>
                <th className="text-right py-2 font-semibold text-[#425563]">Records</th>
                <th className="text-right py-2 font-semibold text-[#425563]">Completed</th>
                <th className="text-right py-2 font-semibold text-[#425563]">Rate</th>
                <th className="py-2 pl-4" />
              </tr>
            </thead>
            <tbody>
              {categoryBreakdown.map((cat) => (
                <tr key={cat.name} className="border-b border-[#e8edee] hover:bg-[#f0f4f5]">
                  <td className="py-3 font-medium text-[#212b32]">{cat.name}</td>
                  <td className="py-3 text-right text-[#425563]">{cat.total}</td>
                  <td className="py-3 text-right text-[#007f3b] font-semibold">{cat.completed}</td>
                  <td className="py-3 text-right font-bold" style={{ color: cat.pct >= 75 ? "#007f3b" : cat.pct >= 50 ? "#fa8c00" : "#da291c" }}>
                    {cat.pct}%
                  </td>
                  <td className="py-3 pl-4 w-32">
                    <div className="h-2 bg-[#e8edee] rounded overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{
                          width: `${cat.pct}%`,
                          backgroundColor: cat.pct >= 75 ? "#007f3b" : cat.pct >= 50 ? "#fa8c00" : "#da291c",
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded shadow-sm p-6">
        <h2 className="text-base font-bold text-[#212b32] mb-4">Role Competency Requirements</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roleMappings.map((role) => (
            <div key={role.role} className="border border-[#e8edee] rounded p-4">
              <div className="font-semibold text-[#212b32] text-sm">{role.role}</div>
              <div className="text-xs text-[#768692] mt-0.5">{role.bands}</div>
              <div className="text-xs text-[#425563] mt-2">{role.description}</div>
              <div className="mt-3 text-lg font-bold text-[#005eb8]">{role.mandatoryCount}</div>
              <div className="text-xs text-[#768692]">mandatory competencies</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
