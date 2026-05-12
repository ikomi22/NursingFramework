export default function MandatoryBadge({ mandatory }: { mandatory: boolean }) {
  return mandatory ? (
    <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded bg-[#005eb8] text-white">
      Mandatory
    </span>
  ) : (
    <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded border border-[#768692] text-[#425563]">
      Optional
    </span>
  );
}
