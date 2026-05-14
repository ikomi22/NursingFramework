import { competencies, categories } from "@/data/competencies";
import { staffRecords, getStaffSummaries } from "@/data/staff";

export function buildSystemPrompt(): string {
  const total = staffRecords.length;
  const completed = staffRecords.filter((r) => r.status === "Completed").length;
  const expired = staffRecords.filter((r) => r.status === "Expired").length;
  const inProgress = staffRecords.filter((r) => r.status === "In Progress").length;
  const notStarted = staffRecords.filter((r) => r.status === "Not Started").length;

  const compSection = categories
    .map((cat) => {
      const catComps = competencies.filter((c) => c.category === cat);
      const mandatoryCount = catComps.filter((c) => c.mandatory).length;
      const lines = catComps.map(
        (c) =>
          `  ${c.id} ${c.name} [${c.mandatory ? "MANDATORY" : "optional"}, ${c.renewalPeriod}, ${c.band}]`
      );
      return `${cat} (${catComps.length} competencies, ${mandatoryCount} mandatory):\n${lines.join("\n")}`;
    })
    .join("\n\n");

  const summaries = getStaffSummaries();
  const staffSection = summaries
    .map((s) => {
      const records = staffRecords.filter((r) => r.staffId === s.staffId);
      const pct = Math.round((s.completed / s.total) * 100);
      const lines = records.map((r) => {
        const comp = competencies.find((c) => c.id === r.competencyId);
        const name = comp?.name ?? r.competencyId;
        if (r.status === "Completed")
          return `  ✓ ${r.competencyId} ${name} (completed ${r.completionDate}, expires ${r.expiryDate})`;
        if (r.status === "Expired")
          return `  ✗ ${r.competencyId} ${name} (EXPIRED ${r.expiryDate})`;
        if (r.status === "In Progress")
          return `  ~ ${r.competencyId} ${name} (In Progress)`;
        return `  ○ ${r.competencyId} ${name} (Not Started)`;
      });
      return `${s.staffName} | ${s.role} | ${s.ward} | ${s.completed}/${s.total} complete (${pct}%)\n${lines.join("\n")}`;
    })
    .join("\n\n");

  return `You are an NHS nursing compliance assistant with access to live platform data.

Answer questions about individual staff compliance, category breakdowns, ward performance, and what training remains outstanding. Use the data below to give specific, accurate answers. Be concise and practical.

=== COMPETENCY FRAMEWORK ===
${compSection}

=== STAFF COMPLIANCE RECORDS ===
${staffSection}

=== PLATFORM SUMMARY ===
Total staff tracked: ${summaries.length}
Total compliance records: ${total}
Completed: ${completed} (${Math.round((completed / total) * 100)}%)
In Progress: ${inProgress} (${Math.round((inProgress / total) * 100)}%)
Expired: ${expired} (${Math.round((expired / total) * 100)}%)
Not Started: ${notStarted} (${Math.round((notStarted / total) * 100)}%)`;
}
