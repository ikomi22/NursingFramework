import { staffRecords, getStaffSummaries } from "@/data/staff";
import { getCompetencyById } from "@/data/competencies";
import StatusBadge from "@/components/StatusBadge";
import StatCard from "@/components/StatCard";

export default function StaffPage() {
  const summaries = getStaffSummaries();
  const totalRecords = staffRecords.length;
  const expired = staffRecords.filter((r) => r.status === "Expired").length;
  const notStarted = staffRecords.filter((r) => r.status === "Not Started").length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#212b32]">Staff Competency Matrix</h1>
        <p className="text-[#425563] mt-1">Competency status for {summaries.length} tracked staff members</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Staff Members" value={summaries.length} colour="#005eb8" />
        <StatCard label="Total Records" value={totalRecords} colour="#003087" />
        <StatCard label="Expired Records" value={expired} colour="#da291c" subtext="Require renewal" />
        <StatCard label="Not Started" value={notStarted} colour="#768692" subtext="Awaiting completion" />
      </div>

      <div className="space-y-6">
        {summaries.map((staff) => {
          const records = staffRecords.filter((r) => r.staffId === staff.staffId);
          const pct = Math.round((staff.completed / staff.total) * 100);
          return (
            <div key={staff.staffId} className="bg-white rounded shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-[#e8edee] flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h2 className="text-base font-bold text-[#212b32]">{staff.staffName}</h2>
                  <p className="text-sm text-[#768692]">{staff.role} &mdash; {staff.ward}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-xl font-bold text-[#007f3b]">{pct}%</div>
                    <div className="text-xs text-[#768692]">completion</div>
                  </div>
                  <div className="w-24">
                    <div className="h-2 bg-[#e8edee] rounded overflow-hidden">
                      <div className="h-full bg-[#007f3b] rounded" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="text-xs text-[#768692] mt-0.5 text-right">{staff.completed}/{staff.total}</div>
                  </div>
                </div>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#f0f4f5]">
                    <th className="px-4 py-2 text-left font-semibold text-[#425563]">Competency</th>
                    <th className="px-4 py-2 text-left font-semibold text-[#425563]">Status</th>
                    <th className="px-4 py-2 text-left font-semibold text-[#425563]">Completed</th>
                    <th className="px-4 py-2 text-left font-semibold text-[#425563]">Expires</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((r, i) => {
                    const comp = getCompetencyById(r.competencyId);
                    return (
                      <tr key={i} className="border-b border-[#e8edee] hover:bg-[#f9fbfc]">
                        <td className="px-4 py-2.5">
                          <div className="font-medium text-[#212b32]">{comp?.name ?? r.competencyId}</div>
                          <div className="text-xs text-[#768692]">{r.competencyId}</div>
                        </td>
                        <td className="px-4 py-2.5"><StatusBadge status={r.status} /></td>
                        <td className="px-4 py-2.5 text-[#425563]">{r.completionDate ?? "—"}</td>
                        <td className="px-4 py-2.5 text-[#425563]">{r.expiryDate ?? "—"}</td>
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
