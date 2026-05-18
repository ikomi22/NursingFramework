interface StatCardProps {
  label: string;
  value: string | number;
  colour?: string;
  subtext?: string;
  icon?: React.ReactNode;
}

export default function StatCard({ label, value, colour = "#005eb8", subtext, icon }: StatCardProps) {
  return (
    <div
      className="card"
      style={{ padding: "20px 24px", display: "flex", alignItems: "flex-start", gap: 16 }}
    >
      {icon && (
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: `${colour}18`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            color: colour,
          }}
        >
          {icon}
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: colour, lineHeight: 1.1 }}>{value}</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#212b32", marginTop: 4 }}>{label}</div>
        {subtext && <div style={{ fontSize: 12, color: "#768692", marginTop: 2 }}>{subtext}</div>}
      </div>
    </div>
  );
}
