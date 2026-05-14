interface StatCardProps {
  label: string;
  value: string | number;
  colour?: string;
  subtext?: string;
}

export default function StatCard({ label, value, colour = "#005eb8", subtext }: StatCardProps) {
  return (
    <div className="bg-white rounded shadow-sm border-l-4 p-5" style={{ borderLeftColor: colour }}>
      <div className="text-3xl font-bold" style={{ color: colour }}>
        {value}
      </div>
      <div className="text-sm font-semibold text-[#212b32] mt-1">{label}</div>
      {subtext && <div className="text-xs text-[#768692] mt-0.5">{subtext}</div>}
    </div>
  );
}
