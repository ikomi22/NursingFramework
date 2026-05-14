"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Compliance Chat" },
  { href: "/competencies", label: "Competencies" },
  { href: "/categories", label: "Categories" },
  { href: "/staff", label: "Staff Matrix" },
  { href: "/pathways", label: "Learning Pathways" },
  { href: "/reports", label: "Reports" },
];

export default function Header() {
  const pathname = usePathname();

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <header>
      <div style={{ backgroundColor: "#005eb8" }} className="text-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 no-underline">
            <div className="bg-white text-[#005eb8] font-bold text-xl px-3 py-1 rounded">
              NHS
            </div>
            <span className="text-white text-xl font-semibold" style={{ color: "white", textDecoration: "none" }}>
              Nursing Competency Framework
            </span>
          </Link>
        </div>
      </div>
      <nav style={{ backgroundColor: "#003087" }} className="text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 flex gap-0">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-4 py-3 transition-colors no-underline"
              style={{
                color: "white",
                textDecoration: "none",
                backgroundColor: isActive(href) ? "rgba(255,255,255,0.15)" : undefined,
                borderBottom: isActive(href) ? "3px solid white" : "3px solid transparent",
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
