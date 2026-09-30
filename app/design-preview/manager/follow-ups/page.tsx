"use client";

import { reps, leads } from "../../_lib/data";
import { PageHeader, ManagerFilterBar, SectionCard, StageBadge } from "../../_lib/ui";

export default function ManagerFollowUpsPage() {
  const overdue = leads.filter((l) => l.followUpBucket === "overdue");
  const dueToday = leads.filter((l) => l.followUpBucket === "dueToday");
  const upcoming = leads.filter((l) => l.followUpBucket === "upcoming");

  const overdueByRep = reps.map((rep) => ({
    rep: rep.name,
    count: overdue.filter((l) => l.owner === rep.name).length,
  }));
  const maxOverdue = Math.max(1, ...overdueByRep.map((r) => r.count));

  return (
    <>
      <PageHeader title="Follow-Ups" subtitle="Visibility only — a rep's follow-up is theirs to work" />
      <ManagerFilterBar />

      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard title="Overdue by Rep">
          <div className="space-y-3 p-4">
            {overdueByRep.map((row) => (
              <div key={row.rep} className="flex items-center gap-3">
                <span className="w-16 text-sm font-medium">{row.rep}</span>
                <div className="h-1.5 flex-1 rounded-full bg-[#F0F0F2]">
                  <div className="h-1.5 rounded-full bg-rose-500" style={{ width: `${(row.count / maxOverdue) * 100}%` }} />
                </div>
                <span className="text-sm text-[#71717A]">{row.count}</span>
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Due Today">
          <p className="p-4 text-2xl font-semibold">{dueToday.length}</p>
          <p className="px-4 pb-4 text-xs text-[#71717A]">leads across the team</p>
        </SectionCard>
        <SectionCard title="Due Next 7 Days">
          <p className="p-4 text-2xl font-semibold">{upcoming.length}</p>
          <p className="px-4 pb-4 text-xs text-[#71717A]">leads across the team</p>
        </SectionCard>
      </div>

      <SectionCard title="Overdue Leads">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs font-medium uppercase tracking-wide text-[#A1A1AA]">
              <th className="px-4 py-2.5">Prospect</th>
              <th className="px-4 py-2.5">Company</th>
              <th className="px-4 py-2.5">Rep</th>
              <th className="px-4 py-2.5">Stage</th>
              <th className="px-4 py-2.5">Next Follow-Up</th>
            </tr>
          </thead>
          <tbody>
            {overdue.map((lead) => (
              <tr key={lead.id} className="border-t border-[#F0F0F2]">
                <td className="px-4 py-3 font-medium">{lead.prospectName}</td>
                <td className="px-4 py-3 text-[#52525B]">{lead.company}</td>
                <td className="px-4 py-3 text-[#52525B]">{lead.owner}</td>
                <td className="px-4 py-3"><StageBadge stage={lead.stage} /></td>
                <td className="px-4 py-3 text-rose-600">{lead.nextFollowUp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
    </>
  );
}
