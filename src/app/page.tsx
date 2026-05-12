import Link from "next/link";
import StatCard from "@/components/StatCard";
import { competencies, categories } from "@/data/competencies";
import { staffRecords, getStaffSummaries } from "@/data/staff";
import { pathways } from "@/data/pathways";

export default function Dashboard() {
  const totalCompetencies = competencies.length;
  const mandatoryCount = competencies.filter((c) => c.mandatory).length;
  const totalStaff = getStaffSummaries().length;
  const completedRecords = staffRecords.filter((r) => r.status === "Completed").length;
  const expiredRecords = staffRecords.filter((r) => r.status === "Expired").length;
  const complianceRate = Math.round((completedRecords / staffRecords.length) * 100);

  const categoryStats = categories.map((cat) => ({
    name: cat,
    count: competencies.filter((c) => c.category === cat).length,
    mandatory: competencies.filter((c) => c.category === cat && c.mandatory).length,
  }));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#212b32]">Nursing Competency Framework</h1>
        <p className="text-[#425563] mt-2 text-lg">
          Competency-based learning, compliance tracking, and role-based training for nursing staff across the organisation.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <StatCard label="Total Competencies" value={totalCompetencies} colour="#005eb8" />
        <StatCard label="Mandatory Competencies" value={mandatoryCount} colour="#003087" subtext={`${totalCompetencies - mandatoryCount} optional`} />
        <StatCard label="Staff Members Tracked" value={totalStaff} colour="#00a499" />
        <StatCard label="Overall Compliance Rate" value={`${complianceRate}%`} colour="#007f3b" subtext={`${expiredRecords} expired record${expiredRecords !== 1 ? "s" : ""}`} />
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="md:col-span-2 bg-white rounded shadow-sm p-6">
          <h2 className="text-lg font-bold text-[#212b32] mb-4">Competency Categories</h2>
          <div className="space-y-3">
            {categoryStats.map((cat) => (
              <div key={cat.name} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-[#212b32]">{cat.name}</span>
                    <span className="text-[#768692]">{cat.count} competencies</span>
                  </div>
                  <div className="h-2 bg-[#e8edee] rounded overflow-hidden">
                    <div
                      className="h-full bg-[#005eb8] rounded"
                      style={{ width: `${(cat.count / totalCompetencies) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs text-[#768692] w-16 text-right">{cat.mandatory} mandatory</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded shadow-sm p-6">
            <h2 className="text-base font-bold text-[#212b32] mb-3">Learning Pathways</h2>
            <div className="space-y-2">
              {pathways.map((p) => (
                <Link key={p.id} href="/pathways" className="block p-3 bg-[#f0f4f5] rounded hover:bg-[#e8edee] transition-colors no-underline" style={{ textDecoration: "none" }}>
                  <div className="text-sm font-semibold text-[#005eb8]">{p.name}</div>
                  <div className="text-xs text-[#768692] mt-0.5">{p.competencyIds.length} competencies</div>
                </Link>
              ))}
            </div>
            <Link href="/pathways" className="block mt-3 text-sm text-[#005eb8] font-medium">
              View all pathways &rarr;
            </Link>
          </div>

          <div className="bg-white rounded shadow-sm p-6">
            <h2 className="text-base font-bold text-[#212b32] mb-3">Quick Links</h2>
            <div className="space-y-2 text-sm">
              <Link href="/competencies?filter=mandatory" className="block text-[#005eb8]">View mandatory competencies</Link>
              <Link href="/staff" className="block text-[#005eb8]">Staff competency matrix</Link>
              <Link href="/reports" className="block text-[#005eb8]">Compliance reports</Link>
              <Link href="/categories" className="block text-[#005eb8]">Browse by category</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#003087] text-white rounded p-6">
        <h2 className="text-lg font-bold mb-2">Framework Status</h2>
        <p className="text-sm text-blue-200 mb-4">
          The Nursing Competency Framework covers {totalCompetencies} competencies across {categories.length} clinical categories,
          mapped to 6 nursing roles. {mandatoryCount} competencies are mandatory for all applicable bands.
        </p>
        <div className="flex gap-4 flex-wrap">
          <Link href="/competencies" className="bg-white text-[#003087] font-semibold text-sm px-4 py-2 rounded hover:bg-[#e8edee] transition-colors" style={{ textDecoration: "none" }}>
            Browse Competencies
          </Link>
          <Link href="/reports" className="border border-white text-white font-semibold text-sm px-4 py-2 rounded hover:bg-white/10 transition-colors" style={{ textDecoration: "none" }}>
            View Compliance Report
          </Link>
        </div>
      </div>
    </div>
  );
}
