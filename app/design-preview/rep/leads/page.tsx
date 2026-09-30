"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Plus,
  MoreHorizontal,
  SlidersHorizontal,
  X,
  Mail,
  Phone,
  Link2,
  MessageCircle,
  MessageSquare,
  Building2,
  Briefcase,
  CalendarClock,
  ArrowRightLeft,
  Flag,
  CalendarPlus,
  Clock,
  Video,
} from "lucide-react";
import { leads, leadsFor, latestActivity, followUpLabel, type Lead, type Activity } from "../../_lib/data";
import { PageHeader, GradientButton, SecondaryButton, FilterChip, StageBadge, OutcomeBadge, FollowUpBadge, BRAND_GRADIENT } from "../../_lib/ui";

const CURRENT_REP = "Hekal";

type ColumnKey =
  | "leadDate"
  | "jobTitle"
  | "industry"
  | "contact"
  | "latestAction"
  | "latestFeedback"
  | "response"
  | "stage"
  | "lastActivity"
  | "nextFollowUp"
  | "mediaPlan"
  | "quotation";

const OPTIONAL_COLUMNS: { key: ColumnKey; label: string; default: boolean }[] = [
  { key: "leadDate", label: "Lead Date", default: false },
  { key: "jobTitle", label: "Job Title", default: false },
  { key: "industry", label: "Industry", default: false },
  { key: "contact", label: "Contact", default: false },
  { key: "latestAction", label: "Latest Action", default: true },
  { key: "latestFeedback", label: "Latest Feedback", default: false },
  { key: "response", label: "Response", default: true },
  { key: "stage", label: "Stage", default: true },
  { key: "lastActivity", label: "Last Activity", default: false },
  { key: "nextFollowUp", label: "Next Follow-Up", default: true },
  { key: "mediaPlan", label: "Media Plan", default: false },
  { key: "quotation", label: "Quotation", default: false },
];

const activityIcons: Record<Activity["type"], typeof Phone> = {
  Call: Phone,
  Message: MessageSquare,
  "LinkedIn Outreach": Link2,
  WhatsApp: MessageCircle,
  Email: Mail,
  "Follow-Up": Clock,
  Meeting: Video,
  Other: MoreHorizontal,
};

export default function RepLeadsPage() {
  const [selected, setSelected] = useState<Lead | null>(null);
  const [colsOpen, setColsOpen] = useState(false);
  const [visibleCols, setVisibleCols] = useState<Record<ColumnKey, boolean>>(() =>
    Object.fromEntries(OPTIONAL_COLUMNS.map((c) => [c.key, c.default])) as Record<ColumnKey, boolean>
  );
  const myLeads = leadsFor(CURRENT_REP);
  const columns = OPTIONAL_COLUMNS.filter((c) => visibleCols[c.key]);

  return (
    <>
      <PageHeader
        title="My Leads"
        subtitle={`${myLeads.length} leads assigned to you`}
        action={<GradientButton icon={Plus}>Add Row</GradientButton>}
      />

      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(24,24,27,0.04)]">
        <div className="flex flex-wrap items-center gap-2 border-b border-black/[0.04] p-3.5">
          <div className="relative min-w-[200px] flex-1">
            <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" />
            <input
              placeholder="Search leads..."
              className="w-full rounded-[10px] border border-transparent bg-[#F7F7F8] py-2 pl-8 pr-3 text-sm outline-none focus:border-[#635BFF] focus:bg-white"
            />
          </div>
          <FilterChip>Stage ▾</FilterChip>
          <FilterChip>Response ▾</FilterChip>
          <FilterChip>Source ▾</FilterChip>
          <FilterChip>Campaign ▾</FilterChip>
          <div className="relative ml-auto">
            <button
              onClick={() => setColsOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-black/[0.06] px-3 py-1.5 text-xs font-medium text-[#3F3F46] hover:bg-[#F7F7F8]"
            >
              <SlidersHorizontal size={12} /> Columns
            </button>
            {colsOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setColsOpen(false)} />
                <div className="absolute right-0 top-full z-40 mt-2 w-56 rounded-xl border border-black/[0.06] bg-white p-2 shadow-[0_8px_30px_rgba(24,24,27,0.12)]">
                  <p className="px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-[#A1A1AA]">Show Columns</p>
                  {OPTIONAL_COLUMNS.map((col) => (
                    <label key={col.key} className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-[#3F3F46] hover:bg-[#F7F7F8]">
                      <input
                        type="checkbox"
                        checked={visibleCols[col.key]}
                        onChange={() => setVisibleCols((v) => ({ ...v, [col.key]: !v[col.key] }))}
                        className="h-3.5 w-3.5 rounded border-[#D4D4D8] text-[#635BFF] focus:ring-[#635BFF]"
                      />
                      {col.label}
                    </label>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs font-medium uppercase tracking-wide text-[#A1A1AA]">
                <th className="sticky left-0 z-10 min-w-[200px] bg-white px-4 py-2.5 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.06)]">Prospect</th>
                {columns.map((col) => (
                  <th key={col.key} className="whitespace-nowrap px-4 py-2.5">{col.label}</th>
                ))}
                <th className="sticky right-0 z-10 w-10 bg-white px-4 py-2.5 shadow-[-2px_0_4px_-2px_rgba(0,0,0,0.06)]" />
              </tr>
            </thead>
            <tbody>
              {myLeads.map((lead) => {
                const latest = latestActivity(lead);
                const isSelected = selected?.id === lead.id;
                const stickyBg = isSelected ? "bg-[#F1EFFF]" : "bg-white group-hover:bg-[#F3F1FF]";
                return (
                  <tr
                    key={lead.id}
                    onClick={() => setSelected(lead)}
                    className={`group relative cursor-pointer border-t border-black/[0.03] transition-colors ${
                      isSelected ? "bg-[#F1EFFF]" : "hover:bg-[#F3F1FF]"
                    }`}
                    style={isSelected ? { boxShadow: "inset 2px 0 0 #635BFF" } : undefined}
                  >
                    <td className={`sticky left-0 z-10 px-4 py-2.5 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.06)] ${stickyBg}`}>
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ECEBFF] text-[11px] font-semibold text-[#4F46E5]">
                          {lead.prospectName.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-medium text-[#18181B]">{lead.prospectName}</p>
                          <p className="truncate text-xs text-[#A1A1AA]">{lead.company}</p>
                        </div>
                      </div>
                    </td>
                    {columns.map((col) => (
                      <td key={col.key} className="whitespace-nowrap px-4 py-3 text-[#52525B]">
                        {col.key === "leadDate" && lead.leadDate}
                        {col.key === "jobTitle" && lead.jobTitle}
                        {col.key === "industry" && lead.industry}
                        {col.key === "contact" && (
                          <div className="flex items-center gap-2 text-[#71717A]">
                            <Mail size={13} />
                            <Phone size={13} />
                          </div>
                        )}
                        {col.key === "latestAction" && latest.action}
                        {col.key === "latestFeedback" && <span className="block max-w-[220px] truncate">{latest.feedback}</span>}
                        {col.key === "response" && lead.responseStatus}
                        {col.key === "stage" && <StageBadge stage={lead.stage} />}
                        {col.key === "lastActivity" && <span className="text-[#A1A1AA]">{latest.when}</span>}
                        {col.key === "nextFollowUp" && <FollowUpBadge bucket={lead.followUpBucket} label={lead.nextFollowUp} />}
                        {col.key === "mediaPlan" && (lead.finalMediaPlanAmount ? `EGP ${lead.finalMediaPlanAmount.toLocaleString()}` : "—")}
                        {col.key === "quotation" && (lead.finalQuotationAmount ? `EGP ${lead.finalQuotationAmount.toLocaleString()}` : "—")}
                      </td>
                    ))}
                    <td className={`sticky right-0 z-10 px-4 py-3 shadow-[-2px_0_4px_-2px_rgba(0,0,0,0.06)] ${stickyBg}`}>
                      <button className="hidden rounded-md p-1 text-[#71717A] hover:bg-[#ECEBFF] hover:text-[#635BFF] group-hover:block">
                        <MoreHorizontal size={15} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-black/[0.04] px-4 py-3 text-xs text-[#71717A]">
          <span>Showing {myLeads.length} of {leads.length} organization leads</span>
          <div className="flex gap-2">
            <SecondaryButton>Prev</SecondaryButton>
            <SecondaryButton>Next</SecondaryButton>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected && <LeadDrawer lead={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}

function QuickAction({ icon: Icon, label }: { icon: typeof Mail; label: string }) {
  return (
    <button className="flex flex-1 flex-col items-center gap-1.5 rounded-xl py-2.5 text-[#3F3F46] hover:bg-[#F4F3FF] hover:text-[#4F46E5]">
      <Icon size={16} />
      <span className="text-[11px] font-medium">{label}</span>
    </button>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-[#FAFAFF] px-3 py-2.5">
      <p className="text-[11px] text-[#A1A1AA]">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-[#18181B]">{value}</p>
    </div>
  );
}

function LeadDrawer({ lead, onClose }: { lead: Lead; onClose: () => void }) {
  const timeline = [...lead.activities].reverse();

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/10"
      />
      <motion.aside
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto bg-white p-6 shadow-[-8px_0_30px_rgba(24,24,27,0.08)]"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold text-white ${BRAND_GRADIENT}`}>
              {lead.prospectName.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <h3 className="text-base font-semibold">{lead.prospectName}</h3>
              <p className="flex items-center gap-1 text-xs text-[#71717A]">
                <Briefcase size={12} /> {lead.jobTitle} <span className="mx-0.5">·</span> <Building2 size={12} /> {lead.company}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-md p-1 text-[#71717A] hover:bg-[#F7F7F8]">
            <X size={16} />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <StageBadge stage={lead.stage} />
          <OutcomeBadge outcome={lead.outcome} />
        </div>

        <div className="mt-5 flex items-stretch rounded-2xl bg-[#FAFAFF]">
          <QuickAction icon={Mail} label="Email" />
          <QuickAction icon={Phone} label="Call" />
          <QuickAction icon={MessageCircle} label="WhatsApp" />
          <QuickAction icon={Link2} label="LinkedIn" />
          <QuickAction icon={MoreHorizontal} label="More" />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <InfoBlock label="Owner" value={lead.owner} />
          <InfoBlock label="Source" value={lead.source} />
          <InfoBlock label="Campaign" value={lead.campaign} />
          <InfoBlock label="Next Follow-Up" value={followUpLabel[lead.followUpBucket] === "—" ? "—" : lead.nextFollowUp} />
          <InfoBlock label="Media Plan" value={lead.finalMediaPlanAmount ? `EGP ${lead.finalMediaPlanAmount.toLocaleString()}` : "—"} />
          <InfoBlock label="Quotation" value={lead.finalQuotationAmount ? `EGP ${lead.finalQuotationAmount.toLocaleString()}` : "—"} />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <SecondaryButton icon={CalendarClock}>Add Activity</SecondaryButton>
          <SecondaryButton icon={ArrowRightLeft}>Change Stage</SecondaryButton>
          <SecondaryButton icon={Flag}>Set Outcome</SecondaryButton>
          <SecondaryButton icon={CalendarPlus}>Set Follow-Up</SecondaryButton>
        </div>

        <div className="mt-6">
          <h4 className="mb-3 text-xs font-medium uppercase tracking-wide text-[#A1A1AA]">Activity Timeline</h4>
          <div className="relative space-y-4 text-sm">
            {timeline.length > 1 && (
              <div className="absolute left-3 top-3 bottom-3 w-px bg-[#EEEAFE]" aria-hidden />
            )}
            {timeline.map((a, i) => {
              const Icon = activityIcons[a.type] ?? MoreHorizontal;
              return (
                <div key={i} className="relative flex gap-3">
                  <span className="relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F1EAFF] text-[#7C3AED]">
                    <Icon size={12} />
                  </span>
                  <div>
                    <p className="text-[#18181B]">{a.note}</p>
                    <p className="text-xs text-[#A1A1AA]">{a.type} · {a.when} · {a.by}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.aside>
    </>
  );
}
