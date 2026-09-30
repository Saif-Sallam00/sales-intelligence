"use client";

import {
  UserPlus,
  Users,
  Activity,
  Calendar,
  Trophy,
  Percent,
  AlertTriangle,
  Phone,
  MessageSquare,
  Link2,
  MessageCircle,
  Mail,
  Clock,
  Video,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { leadsFor, pipelineMatrixStages } from "../../_lib/data";
import { PageHeader, KpiCard, SectionCard, StageBadge } from "../../_lib/ui";

const CURRENT_REP = "Hekal";

const activityIcons: Record<string, typeof Phone> = {
  Call: Phone,
  Message: MessageSquare,
  "LinkedIn Outreach": Link2,
  WhatsApp: MessageCircle,
  Email: Mail,
  "Follow-Up": Clock,
  Meeting: Video,
  Other: MoreHorizontal,
};

export default function RepPerformancePage() {
  const myLeads = leadsFor(CURRENT_REP);

  const newLeads = myLeads.length;
  const activeLeads = myLeads.filter((l) => l.stage !== "Closed" && l.stage !== "Cancelled").length;
  const allActivities = myLeads.flatMap((l) => l.activities);
  const totalActivities = allActivities.length;
  const meetings = myLeads.filter((l) => l.activities.some((a) => a.type === "Meeting")).length;
  const meetingActivities = allActivities.filter((a) => a.type === "Meeting").length;
  const won = myLeads.filter((l) => l.outcome === "Won").length;
  const winRate = newLeads ? Math.round((won / newLeads) * 100) : 0;
  const overdue = myLeads.filter((l) => l.followUpBucket === "overdue").length;

  const activityBreakdown = Object.entries(
    allActivities.reduce<Record<string, number>>((acc, a) => {
      acc[a.type] = (acc[a.type] ?? 0) + 1;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1]);

  const pipeline = pipelineMatrixStages.map((stage) => ({
    stage,
    count: myLeads.filter((l) => l.stage === stage).length,
  }));

  return (
    <>
      <PageHeader title="My Performance" subtitle="Current period vs previous period" />

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <KpiCard icon={UserPlus} tint="bg-blue-50 text-blue-600" value={String(newLeads)} label="New Leads" trend="+2 vs prev" />
        <KpiCard icon={Users} tint="bg-cyan-50 text-cyan-600" value={String(activeLeads)} label="Active Leads" trend="+1 vs prev" />
        <KpiCard icon={Activity} tint="bg-indigo-50 text-indigo-600" value={String(totalActivities)} label="Total Activities" trend="+15% vs prev" />
        <KpiCard icon={Calendar} tint="bg-violet-50 text-violet-600" value={String(meetings)} label="Meetings" trend="steady" />
        <KpiCard icon={Trophy} tint="bg-emerald-50 text-emerald-600" value={String(won)} label="Won" trend="+1 vs prev" />
        <KpiCard icon={Percent} tint="bg-amber-50 text-amber-600" value={`${winRate}%`} label="Win Rate (leads created in period)" />
        <KpiCard icon={AlertTriangle} tint="bg-rose-50 text-rose-600" value={String(overdue)} label="Overdue Follow-Ups" />
        <KpiCard icon={Video} tint="bg-fuchsia-50 text-fuchsia-600" value={String(meetingActivities)} label="Meeting Activities" />
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Pipeline">
          <div className="space-y-3 p-4">
            {pipeline.map((row) => (
              <div key={row.stage} className="flex items-center justify-between">
                <StageBadge stage={row.stage} />
                <div className="flex flex-1 items-center gap-2 px-4">
                  <div className="h-1.5 flex-1 rounded-full bg-[#F0F0F2]">
                    <div
                      className="h-1.5 rounded-full bg-[#6366F1]"
                      style={{ width: `${Math.min(100, (row.count / Math.max(1, myLeads.length)) * 100)}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm font-medium">{row.count}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Activity Breakdown">
          <div className="space-y-3 p-4">
            {activityBreakdown.map(([type, count]) => {
              const Icon = activityIcons[type] ?? MoreHorizontal;
              return (
                <div key={type} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-[#3F3F46]">
                    <Icon size={14} className="text-[#71717A]" /> {type}
                  </span>
                  <span className="font-medium">{count}</span>
                </div>
              );
            })}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Current vs Previous Period">
        <div className="grid grid-cols-2 gap-4 p-4 text-sm sm:grid-cols-4">
          {[
            { label: "New Leads", current: newLeads, prev: newLeads - 2, up: true },
            { label: "Activities", current: totalActivities, prev: totalActivities - 3, up: true },
            { label: "Meetings", current: meetings, prev: meetings, up: null },
            { label: "Win Rate", current: `${winRate}%`, prev: `${Math.max(0, winRate - 5)}%`, up: true },
          ].map((row) => (
            <div key={row.label}>
              <p className="text-xs text-[#71717A]">{row.label}</p>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="text-base font-semibold">{row.current}</span>
                <span className="text-xs text-[#A1A1AA]">was {row.prev}</span>
                {row.up === true && <ArrowUpRight size={13} className="text-emerald-500" />}
                {row.up === false && <ArrowDownRight size={13} className="text-rose-500" />}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
