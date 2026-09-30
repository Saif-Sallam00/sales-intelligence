"use client";

import { sources, leads } from "../../_lib/data";
import { PageHeader, ManagerFilterBar, SectionCard } from "../../_lib/ui";

export default function ManagerSourcesPage() {
  const rows = sources.map((source) => {
    const sourceLeads = leads.filter((l) => l.source === source);
    const total = sourceLeads.length;
    const meetings = sourceLeads.filter((l) => l.activities.some((a) => a.type === "Meeting")).length;
    const won = sourceLeads.filter((l) => l.outcome === "Won").length;
    return {
      source,
      total,
      meetings,
      won,
      meetingRate: total ? Math.round((meetings / total) * 100) : 0,
      winRate: total ? Math.round((won / total) * 100) : 0,
    };
  });

  return (
    <>
      <PageHeader title="Sources" subtitle="Where leads come from, and how well they convert" />
      <ManagerFilterBar />

      <SectionCard title="Source Performance">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs font-medium uppercase tracking-wide text-[#A1A1AA]">
              <th className="px-4 py-2.5">Source</th>
              <th className="px-4 py-2.5">Leads</th>
              <th className="px-4 py-2.5">Meetings</th>
              <th className="px-4 py-2.5">Won</th>
              <th className="px-4 py-2.5">Meeting Rate</th>
              <th className="px-4 py-2.5">Win Rate</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.source} className="border-t border-[#F0F0F2] hover:bg-[#FAFAFF]">
                <td className="px-4 py-3 font-medium">{row.source}</td>
                <td className="px-4 py-3 text-[#52525B]">{row.total}</td>
                <td className="px-4 py-3 text-[#52525B]">{row.meetings}</td>
                <td className="px-4 py-3 text-[#52525B]">{row.won}</td>
                <td className="px-4 py-3 text-[#52525B]">{row.meetingRate}%</td>
                <td className="px-4 py-3 text-[#52525B]">{row.winRate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
    </>
  );
}
