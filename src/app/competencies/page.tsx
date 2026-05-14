"use client";

import { useState } from "react";
import Link from "next/link";
import { competencies, categories } from "@/data/competencies";
import MandatoryBadge from "@/components/MandatoryBadge";

const renewalColours: Record<string, string> = {
  Annual: "text-[#212b32]",
  "Every 2 Years": "text-[#425563]",
  "Every 3 Years": "text-[#768692]",
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
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#212b32]">Competencies</h1>
        <p className="text-[#425563] mt-1">
          {competencies.length} competencies across {categories.length} categories
        </p>
      </div>

      <div className="bg-white rounded shadow-sm p-4 mb-6 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-48">
          <label className="block text-sm font-semibold text-[#212b32] mb-1">Search</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, ID or description..."
            className="w-full border border-[#768692] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#005eb8]"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#212b32] mb-1">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-[#768692] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#005eb8]"
          >
            <option>All</option>
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#212b32] mb-1">Type</label>
          <select
            value={mandatoryFilter}
            onChange={(e) => setMandatoryFilter(e.target.value)}
            className="border border-[#768692] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#005eb8]"
          >
            <option>All</option>
            <option>Mandatory</option>
            <option>Optional</option>
          </select>
        </div>
        <div className="text-sm text-[#768692]">
          Showing <strong className="text-[#212b32]">{filtered.length}</strong> of {competencies.length}
        </div>
      </div>

      <div className="bg-white rounded shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#003087] text-white text-left">
              <th className="px-4 py-3 font-semibold">ID</th>
              <th className="px-4 py-3 font-semibold">Competency</th>
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold">Band</th>
              <th className="px-4 py-3 font-semibold">Assessment</th>
              <th className="px-4 py-3 font-semibold">Renewal</th>
              <th className="px-4 py-3 font-semibold">Type</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr key={c.id} className={`border-b border-[#e8edee] hover:bg-[#f0f4f5] ${i % 2 === 0 ? "bg-white" : "bg-[#f9fbfc]"}`}>
                <td className="px-4 py-3 font-mono text-xs text-[#768692]">{c.id}</td>
                <td className="px-4 py-3">
                  <Link href={`/competencies/${c.id}`} className="font-semibold text-[#005eb8]">
                    {c.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-[#425563]">{c.category}</td>
                <td className="px-4 py-3 text-[#425563] whitespace-nowrap">{c.band}</td>
                <td className="px-4 py-3 text-[#425563]">{c.assessmentMethod}</td>
                <td className={`px-4 py-3 ${renewalColours[c.renewalPeriod]}`}>{c.renewalPeriod}</td>
                <td className="px-4 py-3"><MandatoryBadge mandatory={c.mandatory} /></td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-[#768692]">No competencies match your filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
