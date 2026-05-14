import { pathways } from "@/data/pathways";
import { getCompetencyById } from "@/data/competencies";
import Link from "next/link";
import MandatoryBadge from "@/components/MandatoryBadge";

const pathwayColours = ["#005eb8", "#00a499", "#7c2d8e"];

export default function PathwaysPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#212b32]">Learning Pathways</h1>
        <p className="text-[#425563] mt-1">Structured competency sequences for different nursing roles</p>
      </div>

      <div className="space-y-8">
        {pathways.map((pathway, pi) => {
          const colour = pathwayColours[pi % pathwayColours.length];
          const comps = pathway.competencyIds.map(getCompetencyById).filter(Boolean);
          const mandatory = comps.filter((c) => c!.mandatory).length;

          return (
            <div key={pathway.id} className="bg-white rounded shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-[#e8edee]" style={{ borderLeftColor: colour, borderLeftWidth: 4 }}>
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div>
                    <span className="text-xs font-mono text-[#768692]">{pathway.id}</span>
                    <h2 className="text-xl font-bold text-[#212b32] mt-0.5">{pathway.name}</h2>
                    <p className="text-sm text-[#768692] mt-1">Target role: <strong className="text-[#425563]">{pathway.targetRole}</strong></p>
                  </div>
                  <div className="flex gap-4 text-sm text-right">
                    <div>
                      <div className="text-2xl font-bold" style={{ color: colour }}>{comps.length}</div>
                      <div className="text-xs text-[#768692]">competencies</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#005eb8]">{mandatory}</div>
                      <div className="text-xs text-[#768692]">mandatory</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-3">
                  {comps.map((comp, idx) => (
                    <div key={comp!.id} className="flex items-start gap-4">
                      <div
                        className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold"
                        style={{ backgroundColor: colour }}
                      >
                        {idx + 1}
                      </div>
                      <div className="flex-1 bg-[#f0f4f5] rounded p-3">
                        <div className="flex items-start justify-between gap-2 flex-wrap">
                          <Link href={`/competencies/${comp!.id}`} className="font-semibold text-[#005eb8] text-sm">
                            {comp!.name}
                          </Link>
                          <MandatoryBadge mandatory={comp!.mandatory} />
                        </div>
                        <div className="flex gap-4 mt-1 text-xs text-[#768692]">
                          <span>{comp!.category}</span>
                          <span>{comp!.assessmentMethod}</span>
                          <span>{comp!.renewalPeriod}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
