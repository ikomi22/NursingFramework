"use client";

import { useState } from "react";
import Link from "next/link";
import { competencies, categories } from "@/data/competencies";
import MandatoryBadge from "@/components/MandatoryBadge";

const categoryColors: Record<string, string> = {
  "Clinical Skills": "#005eb8",
  "Patient Safety": "#da291c",
  "Medicines Management": "#7c2d8e",
  "Infection Prevention & Control": "#00a499",
  "Communication": "#fa8c00",
  "Digital & Documentation": "#003087",
  "Emergency Response": "#e85c00",
  "Safeguarding": "#b88600",
  "Leadership & Professional Practice": "#007f3b",
};

const renewalColors: Record<string, string> = {
  Annual: "#da291c",
  "Every 2 Years": "#fa8c00",
  "Every 3 Years": "#007f3b",
};

export default function CompetenciesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [mandatoryFilter, setMandatoryFilter] = useState("All");

  const filtered = competencies.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || c.category === selectedCategory;
    const matchesMandatory =
      mandatoryFilter === "All" ||
      (mandatoryFilter === "Mandatory" && c.mandatory) ||
      (mandatoryFilter === "Optional" && !c.mandatory);
    return matchesSearch && matchesCategory && matchesMandatory;
  });

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#212b32", margin: 0 }}>Competencies</h1>
        <p style={{ fontSize: 13, color: "#768692", marginTop: 4 }}>
          {competencies.length} competencies across {categories.length} categories
        </p>
      </div>

      <div className="card" style={{ padding: 16, marginBottom: 20, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "flex-end" }}>
        <div style={{ flex: "1 1 240px" }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#425563", marginBottom: 6 }}>Search</label>
          <div style={{ position: "relative" }}>
            <svg
              width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#768692" strokeWidth="2"
              style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}
            >
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Name, ID or description…"
              style={{
                width: "100%",
                border: "1px solid #dde2e8",
                borderRadius: 6,
                padding: "8px 12px 8px 32px",
                fontSize: 13,
                color: "#212b32",
                outline: "none",
                background: "#fafbfc",
              }}
            />
          </div>
        </div>
        <div style={{ flex: "0 1 auto" }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#425563", marginBottom: 6 }}>Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              border: "1px solid #dde2e8",
              borderRadius: 6,
              padding: "8px 32px 8px 12px",
              fontSize: 13,
              color: "#212b32",
              outline: "none",
              background: "#fafbfc",
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23768692' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 10px center",
            }}
          >
            <option>All</option>
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div style={{ flex: "0 1 auto" }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#425563", marginBottom: 6 }}>Type</label>
          <select
            value={mandatoryFilter}
            onChange={(e) => setMandatoryFilter(e.target.value)}
            style={{
              border: "1px solid #dde2e8",
              borderRadius: 6,
              padding: "8px 32px 8px 12px",
              fontSize: 13,
              color: "#212b32",
              outline: "none",
              background: "#fafbfc",
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23768692' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 10px center",
            }}
          >
            <option>All</option>
            <option>Mandatory</option>
            <option>Optional</option>
          </select>
        </div>
        <div style={{ fontSize: 12, color: "#768692", marginLeft: "auto" }}>
          <strong style={{ color: "#212b32" }}>{filtered.length}</strong> of {competencies.length} shown
        </div>
      </div>

      <div className="card" style={{ overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#f4f6f9", borderBottom: "2px solid #eaecef" }}>
              <th style={{ padding: "11px 16px", textAlign: "left", fontWeight: 600, color: "#425563", fontSize: 12 }}>ID</th>
              <th style={{ padding: "11px 16px", textAlign: "left", fontWeight: 600, color: "#425563", fontSize: 12 }}>Competency</th>
              <th style={{ padding: "11px 16px", textAlign: "left", fontWeight: 600, color: "#425563", fontSize: 12 }}>Category</th>
              <th style={{ padding: "11px 16px", textAlign: "left", fontWeight: 600, color: "#425563", fontSize: 12 }}>Band</th>
              <th style={{ padding: "11px 16px", textAlign: "left", fontWeight: 600, color: "#425563", fontSize: 12 }}>Renewal</th>
              <th style={{ padding: "11px 16px", textAlign: "left", fontWeight: 600, color: "#425563", fontSize: 12 }}>Type</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr
                key={c.id}
                className="table-row-hover"
                style={{ borderBottom: "1px solid #eaecef" }}
              >
                <td style={{ padding: "11px 16px", fontFamily: "monospace", fontSize: 11, color: "#768692" }}>{c.id}</td>
                <td style={{ padding: "11px 16px" }}>
                  <Link
                    href={`/competencies/${c.id}`}
                    style={{ fontWeight: 600, color: "#005eb8", fontSize: 13 }}
                  >
                    {c.name}
                  </Link>
                  <div style={{ fontSize: 11, color: "#768692", marginTop: 2 }}>{c.assessmentMethod}</div>
                </td>
                <td style={{ padding: "11px 16px" }}>
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "2px 8px",
                      borderRadius: 4,
                      background: `${categoryColors[c.category] ?? "#005eb8"}18`,
                      color: categoryColors[c.category] ?? "#005eb8",
                    }}
                  >
                    {c.category}
                  </span>
                </td>
                <td style={{ padding: "11px 16px", color: "#425563", fontSize: 12, whiteSpace: "nowrap" }}>{c.band}</td>
                <td style={{ padding: "11px 16px" }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: renewalColors[c.renewalPeriod] ?? "#212b32" }}>
                    {c.renewalPeriod}
                  </span>
                </td>
                <td style={{ padding: "11px 16px" }}>
                  <MandatoryBadge mandatory={c.mandatory} />
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: "40px 16px", textAlign: "center", color: "#768692" }}>
                  No competencies match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
