export default function MandatoryBadge({ mandatory }: { mandatory: boolean }) {
  return mandatory ? (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontSize: 11,
        fontWeight: 700,
        padding: "2px 8px",
        borderRadius: 4,
        background: "#005eb8",
        color: "white",
        letterSpacing: "0.03em",
        textTransform: "uppercase",
      }}
    >
      Mandatory
    </span>
  ) : (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontSize: 11,
        fontWeight: 600,
        padding: "2px 8px",
        borderRadius: 4,
        background: "#f0f2f4",
        color: "#768692",
        letterSpacing: "0.03em",
        textTransform: "uppercase",
      }}
    >
      Optional
    </span>
  );
}
