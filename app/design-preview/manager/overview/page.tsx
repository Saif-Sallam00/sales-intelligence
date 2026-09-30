"use client";

import { Users, UserPlus, Activity, Calendar, Trophy, Percent, AlertTriangle } from "lucide-react";
import { leads } from "../../_lib/data";
import { PageHeader, ManagerFilterBar, KpiCard } from "../../_lib/ui";

export default function ManagerOverviewPage() {
  const activeLeads = leads.filter((l) => l.stage !== "Closed" && l.stage !== "Cancelled").length;
  const newLeads = leads.length;
  const totalActivities = leads.flatMap((l) => l.activities).length;
  const meetings = leads.filter((l) => l.activities.some((a) => a.type === "Meeting")).length;
  const won = leads.filter((l) => l.outcome === "Won").length;
  const winRate = newLeads ? Math.round((won / newLeads) * 100) : 0;
  const overdue = leads.filter((l) => l.followUpBucket === "overdue").length;

  return (
    <>
      <PageHeader title="Overview" subtitle="How the team is doing, read-only" />
      <ManagerFilterBar />

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <KpiCard icon={Users} tint="bg-cyan-50 text-cyan-600" value={String(activeLeads)} label="Active Leads" />
        <KpiCard icon={UserPlus} tint="bg-blue-50 text-blue-600" value={String(newLeads)} label="New Leads" />
        <KpiCard icon={Activity} tint="bg-indigo-50 text-indigo-600" value={String(totalActivities)} label="Total Activities" />
        <KpiCard icon={Calendar} tint="bg-violet-50 text-violet-600" value={String(meetings)} label="Meetings" />
        <KpiCard icon={Trophy} tint="bg-emerald-50 text-emerald-600" value={String(won)} label="Won" trend="closed this month" />
        <KpiCard icon={Percent} tint="bg-amber-50 text-amber-600" value={`${winRate}%`} label="Win Rate (leads created in period)" />
        <KpiCard icon={AlertTriangle} tint="bg-rose-50 text-rose-600" value={String(overdue)} label="Overdue Follow-Ups" />
      </section>
    </>
  );
}
