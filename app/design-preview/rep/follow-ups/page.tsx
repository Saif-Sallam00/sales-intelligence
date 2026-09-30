"use client";

import { AlertTriangle, Clock, CalendarDays, Building2 } from "lucide-react";
import { leadsFor, type Lead } from "../../_lib/data";
import { PageHeader, StageBadge, SecondaryButton } from "../../_lib/ui";

const CURRENT_REP = "Hekal";

function FollowUpGroup({
  title,
  icon: Icon,
  tint,
  items,
}: {
  title: string;
  icon: typeof Clock;
  tint: string;
  items: Lead[];
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#E4E4E7] bg-white">
      <div className="flex items-center gap-2 border-b border-[#F0F0F2] px-4 py-3">
        <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${tint}`}>
          <Icon size={14} />
        </span>
        <h2 className="text-sm font-medium">{title}</h2>
        <span className="ml-auto text-xs text-[#71717A]">{items.length}</span>
      </div>
      {items.length === 0 ? (
        <p className="p-4 text-sm text-[#A1A1AA]">Nothing here.</p>
      ) : (
        <div className="divide-y divide-[#F0F0F2]">
          {items.map((lead) => (
            <div key={lead.id} className="flex items-center justify-between px-4 py-3 hover:bg-[#FAFAFF]">
              <div>
                <p className="text-sm font-medium">{lead.prospectName}</p>
                <p className="flex items-center gap-1 text-xs text-[#71717A]">
                  <Building2 size={11} /> {lead.company}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <StageBadge stage={lead.stage} />
                <span className="text-xs text-[#71717A]">{lead.nextFollowUp}</span>
                <SecondaryButton>Open</SecondaryButton>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function RepFollowUpsPage() {
  const myLeads = leadsFor(CURRENT_REP);
  const overdue = myLeads.filter((l) => l.followUpBucket === "overdue");
  const dueToday = myLeads.filter((l) => l.followUpBucket === "dueToday");
  const upcoming = myLeads.filter((l) => l.followUpBucket === "upcoming");

  return (
    <>
      <PageHeader title="Follow-Ups" subtitle="Stay on top of what needs a next step" />
      <div className="space-y-4">
        <FollowUpGroup title="Overdue" icon={AlertTriangle} tint="bg-rose-50 text-rose-600" items={overdue} />
        <FollowUpGroup title="Due Today" icon={Clock} tint="bg-amber-50 text-amber-600" items={dueToday} />
        <FollowUpGroup title="Upcoming (next 7 days)" icon={CalendarDays} tint="bg-blue-50 text-blue-600" items={upcoming} />
      </div>
    </>
  );
}
