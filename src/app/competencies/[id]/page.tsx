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

  return (
    <div>
      <nav className="text-sm text-[#768692] mb-4">
        <Link href="/competencies" className="text-[#005eb8]">Competencies</Link>
        <span className="mx-2">/</span>
        <span>{competency.name}</span>
      </nav>

      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <span className="text-xs font-mono text-[#768692] block mb-1">{competency.id}</span>
          <h1 className="text-3xl font-bold text-[#212b32]">{competency.name}</h1>
          <p className="text-[#425563] mt-1">{competency.category}</p>
        </div>
        <MandatoryBadge mandatory={competency.mandatory} />
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2 bg-white rounded shadow-sm p-6">
          <h2 className="text-base font-bold text-[#212b32] mb-3">Description</h2>
          <p className="text-[#425563]">{competency.description}</p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-semibold text-[#768692] uppercase tracking-wide mb-1">Assessment Method</div>
              <div className="text-sm text-[#212b32] font-medium">{competency.assessmentMethod}</div>
            </div>
            <div>
              <div className="text-xs font-semibold text-[#768692] uppercase tracking-wide mb-1">Renewal Period</div>
              <div className="text-sm text-[#212b32] font-medium">{competency.renewalPeriod}</div>
            </div>
            <div>
              <div className="text-xs font-semibold text-[#768692] uppercase tracking-wide mb-1">Applicable Band</div>
              <div className="text-sm text-[#212b32] font-medium">{competency.band}</div>
            </div>
            <div>
              <div className="text-xs font-semibold text-[#768692] uppercase tracking-wide mb-1">Category</div>
              <div className="text-sm text-[#212b32] font-medium">{competency.category}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded shadow-sm p-6">
          <h2 className="text-base font-bold text-[#212b32] mb-3">Compliance Summary</h2>
          {records.length === 0 ? (
            <p className="text-sm text-[#768692]">No staff records for this competency.</p>
          ) : (
            <div className="space-y-2">
              {(["Completed", "In Progress", "Expired", "Not Started"] as CompetencyStatus[]).map((status) => {
                const count = records.filter((r) => r.status === status).length;
                return (
                  <div key={status} className="flex justify-between items-center text-sm">
                    <StatusBadge status={status} />
                    <span className="font-semibold text-[#212b32]">{count}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {records.length > 0 && (
        <div className="bg-white rounded shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-[#e8edee]">
            <h2 className="text-base font-bold text-[#212b32]">Staff Records</h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#f0f4f5] text-left">
                <th className="px-4 py-3 font-semibold text-[#425563]">Staff</th>
                <th className="px-4 py-3 font-semibold text-[#425563]">Role</th>
                <th className="px-4 py-3 font-semibold text-[#425563]">Ward</th>
                <th className="px-4 py-3 font-semibold text-[#425563]">Status</th>
                <th className="px-4 py-3 font-semibold text-[#425563]">Completed</th>
                <th className="px-4 py-3 font-semibold text-[#425563]">Expires</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, i) => (
                <tr key={`${r.staffId}-${i}`} className="border-b border-[#e8edee] hover:bg-[#f9fbfc]">
                  <td className="px-4 py-3 font-medium text-[#212b32]">{r.staffName}</td>
                  <td className="px-4 py-3 text-[#425563]">{r.role}</td>
                  <td className="px-4 py-3 text-[#425563]">{r.ward}</td>
                  <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                  <td className="px-4 py-3 text-[#425563]">{r.completionDate ?? "—"}</td>
                  <td className="px-4 py-3 text-[#425563]">{r.expiryDate ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
