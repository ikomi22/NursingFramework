import type { CompetencyStatus } from "@/types";

const styles: Record<CompetencyStatus, string> = {
  Completed: "bg-[#007f3b] text-white",
  Expired: "bg-[#da291c] text-white",
  "In Progress": "bg-[#ffb81c] text-[#212b32]",
  "Not Started": "bg-[#768692] text-white",
};

export default function StatusBadge({ status }: { status: CompetencyStatus }) {
  return (
    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded ${styles[status]}`}>
      {status}
    </span>
  );
}
