import type { CompetencyStatus } from "@/types";

const config: Record<CompetencyStatus, { bg: string; color: string; dot: string }> = {
  Completed:    { bg: "#e6f4ed", color: "#007f3b", dot: "#007f3b" },
  Expired:      { bg: "#fde8e6", color: "#c0241a", dot: "#da291c" },
  "In Progress":{ bg: "#fff8e6", color: "#8a5a00", dot: "#ffb81c" },
  "Not Started":{ bg: "#f0f2f4", color: "#425563", dot: "#768692" },
};

export default function StatusBadge({ status }: { status: CompetencyStatus }) {
  const c = config[status];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontSize: 12,
        fontWeight: 600,
        padding: "3px 8px",
        borderRadius: 20,
        background: c.bg,
        color: c.color,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.dot, flexShrink: 0 }} />
      {status}
    </span>
  );
}
