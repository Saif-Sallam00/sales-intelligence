"use client";

import { reps, leads } from "../../_lib/data";
import { PageHeader, ManagerFilterBar, SectionCard } from "../../_lib/ui";

const staticTiming: Record<string, { toMeeting: string; inFollowUp: string }> = {
  Hekal: { toMeeting: "3.2 days", inFollowUp: "5.1 days" },
  Habiba: { toMeeting: "2.6 days", inFollowUp: "6.4 days" },
  Salma: { toMeeting: "4.0 days", inFollowUp: "3.8 days" },
};

export default function ManagerTeamPage() {
  const rows = reps.map((rep) => {
    const repLeads = leads.filter((l) => l.owner === rep.name);
    const activities = repLeads.flatMap((l) => l.activities).length;
    const newLeads = repLeads.length;
    const activeLeads = repLeads.filter((l) => l.stage !== "Closed" && l.stage !== "Cancelled").length;
    const meetings = repLeads.filter((l) => l.activities.some((a) => a.type === "Meeting")).length;
    const won = repLeads.filter((l) => l.outcome === "Won").length;
    const winRate = newLeads ? Math.round((won / newLeads) * 100) : 0;
    const overdue = repLeads.filter((l) => l.followUpBucket === "overdue").length;
    const meetingRate = newLeads ? Math.round((meetings / newLeads) * 100) : 0;
    return { rep: rep.name, activities, newLeads, activeLeads, meetings, won, winRate, overdue, meetingRate, ...staticTiming[rep.name] };
  });

  const teamAvgWinRate = Math.round(rows.reduce((s, r) => s + r.winRate, 0) / rows.length);
  const teamAvgMeetingRate = Math.round(rows.reduce((s, r) => s + r.meetingRate, 0) / rows.length);

  function signalsFor(row: (typeof rows)[number]) {
    const signals: { label: string; tone: string }[] = [];
    if (row.meetingRate > teamAvgMeetingRate) signals.push({ label: "Strong meeting conversion", tone: "bg-violet-50 text-violet-700" });
    if (row.winRate < teamAvgWinRate) signals.push({ label: "Below-team win conversion", tone: "bg-rose-50 text-rose-700" });
    if (row.overdue >= 2) signals.push({ label: "High overdue follow-ups", tone: "bg-amber-50 text-amber-700" });
    if (signals.length === 0) signals.push({ label: "Activity steady", tone: "bg-zinc-100 text-zinc-600" });
    return signals;
  }

  return (
    <>
      <PageHeader title="Team" subtitle="Per-rep performance, read-only" />
      <ManagerFilterBar />

      <SectionCard title="Team Performance">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left text-sm">
            <thead>
              <tr className="text-xs font-medium uppercase tracking-wide text-[#A1A1AA]">
                <th className="px-4 py-2.5">Rep</th>
                <th className="px-4 py-2.5">Activities</th>
                <th className="px-4 py-2.5">New Leads</th>
                <th className="px-4 py-2.5">Active Leads</th>
                <th className="px-4 py-2.5">Meetings</th>
                <th className="px-4 py-2.5">Won</th>
                <th className="px-4 py-2.5">Win Rate</th>
                <th className="px-4 py-2.5">Overdue</th>
                <th className="px-4 py-2.5">Avg Time to Meeting</th>
                <th className="px-4 py-2.5">Avg Time in Follow Up</th>
                <th className="px-4 py-2.5">Signals</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.rep} className="border-t border-[#F0F0F2] hover:bg-[#FAFAFF]">
                  <td className="whitespace-nowrap px-4 py-3 font-medium">{row.rep}</td>
                  <td className="px-4 py-3 text-[#52525B]">{row.activities}</td>
                  <td className="px-4 py-3 text-[#52525B]">{row.newLeads}</td>
                  <td className="px-4 py-3 text-[#52525B]">{row.activeLeads}</td>
                  <td className="px-4 py-3 text-[#52525B]">{row.meetings}</td>
                  <td className="px-4 py-3 text-[#52525B]">{row.won}</td>
                  <td className="px-4 py-3 text-[#52525B]">{row.winRate}%</td>
                  <td className="px-4 py-3 text-[#52525B]">{row.overdue}</td>
                  <td className="px-4 py-3 text-[#52525B]">{row.toMeeting}</td>
                  <td className="px-4 py-3 text-[#52525B]">{row.inFollowUp}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {signalsFor(row).map((s) => (
                        <span key={s.label} className={`rounded-full px-2 py-0.5 text-xs font-medium ${s.tone}`}>
                          {s.label}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </>
  );
}
