"use client";

import { campaigns, leads } from "../../_lib/data";
import { PageHeader, ManagerFilterBar, SectionCard } from "../../_lib/ui";

export default function ManagerCampaignsPage() {
  const rows = campaigns.map((campaign) => {
    const campaignLeads = leads.filter((l) => l.campaign === campaign);
    const total = campaignLeads.length;
    const meetings = campaignLeads.filter((l) => l.activities.some((a) => a.type === "Meeting")).length;
    const won = campaignLeads.filter((l) => l.outcome === "Won").length;
    return {
      campaign,
      total,
      meetings,
      won,
      meetingRate: total ? Math.round((meetings / total) * 100) : 0,
      winRate: total ? Math.round((won / total) * 100) : 0,
    };
  });

  return (
    <>
      <PageHeader title="Campaigns" subtitle="Campaign-level lead volume and conversion" />
      <ManagerFilterBar />

      <SectionCard title="Campaign Performance">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs font-medium uppercase tracking-wide text-[#A1A1AA]">
              <th className="px-4 py-2.5">Campaign</th>
              <th className="px-4 py-2.5">Leads</th>
              <th className="px-4 py-2.5">Meetings</th>
              <th className="px-4 py-2.5">Won</th>
              <th className="px-4 py-2.5">Meeting Rate</th>
              <th className="px-4 py-2.5">Win Rate</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.campaign} className="border-t border-[#F0F0F2] hover:bg-[#FAFAFF]">
                <td className="px-4 py-3 font-medium">{row.campaign}</td>
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
