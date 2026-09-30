// THROWAWAY shared UI primitives for the design-preview mockups only.
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronsUpDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Stage, Lead } from "./data";

// Signature brand gradient — reserved for high-value moments only (never on every button).
export const BRAND_GRADIENT = "bg-[linear-gradient(135deg,#635BFF_0%,#8B5CF6_45%,#C026D3_100%)]";
export const BRAND = "#635BFF";

export const stageStyles: Record<Stage, { bg: string; text: string; dot: string }> = {
  New: { bg: "bg-[#F4F4F5]", text: "text-[#52525B]", dot: "bg-[#A1A1AA]" },
  "Contact Attempted": { bg: "bg-[#EAF2FF]", text: "text-[#2563EB]", dot: "bg-[#3B82F6]" },
  "Follow Up": { bg: "bg-[#FFF4DE]", text: "text-[#D97706]", dot: "bg-[#F59E0B]" },
  Meeting: { bg: "bg-[#F1EAFF]", text: "text-[#7C3AED]", dot: "bg-[#8B5CF6]" },
  Ongoing: { bg: "bg-[#ECFEFF]", text: "text-[#0E7490]", dot: "bg-[#06B6D4]" },
  Closed: { bg: "bg-[#E7FAF2]", text: "text-[#059669]", dot: "bg-[#10B981]" },
  Cancelled: { bg: "bg-[#FFF0F2]", text: "text-[#E11D48]", dot: "bg-[#F43F5E]" },
};

export function StageBadge({ stage }: { stage: Stage }) {
  const s = stageStyles[stage];
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${s.bg} ${s.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {stage}
    </span>
  );
}

export function OutcomeBadge({ outcome }: { outcome: Lead["outcome"] }) {
  if (!outcome) return <span className="text-xs text-[#A1A1AA]">—</span>;
  const isWon = outcome === "Won";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
        isWon ? "bg-[#E7FAF2] text-[#059669]" : "bg-[#FFF0F2] text-[#E11D48]"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${isWon ? "bg-[#10B981]" : "bg-[#F43F5E]"}`} />
      {outcome}
    </span>
  );
}

export function FollowUpBadge({ bucket, label }: { bucket: Lead["followUpBucket"]; label: string }) {
  if (bucket === "none") return <span className="text-xs text-[#A1A1AA]">{label}</span>;
  const styles: Record<string, string> = {
    overdue: "bg-[#FFF0F2] text-[#E11D48]",
    dueToday: "bg-[#FFF4DE] text-[#D97706]",
    upcoming: "bg-[#F4F4F5] text-[#52525B]",
  };
  return <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${styles[bucket]}`}>{label}</span>;
}

export function PrimaryButton({
  children,
  icon: Icon,
  onClick,
}: {
  children: React.ReactNode;
  icon?: LucideIcon;
  onClick?: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -1, scale: 1.02, backgroundColor: "#554FE0" }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className="inline-flex items-center gap-1.5 rounded-[10px] bg-[#635BFF] px-4 py-2 text-sm font-medium text-white"
    >
      {Icon && <Icon size={15} />}
      {children}
    </motion.button>
  );
}

// Reserved for the single highest-value action on a page — not a general-purpose button.
export function GradientButton({
  children,
  icon: Icon,
  onClick,
}: {
  children: React.ReactNode;
  icon?: LucideIcon;
  onClick?: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -1, scale: 1.02, boxShadow: "0 8px 24px rgba(99,91,255,0.35)" }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className={`inline-flex items-center gap-1.5 rounded-[10px] px-4 py-2 text-sm font-medium text-white ${BRAND_GRADIENT}`}
    >
      {Icon && <Icon size={15} />}
      {children}
    </motion.button>
  );
}

export function SecondaryButton({
  children,
  icon: Icon,
  onClick,
}: {
  children: React.ReactNode;
  icon?: LucideIcon;
  onClick?: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className="inline-flex items-center gap-1.5 rounded-[10px] border border-black/[0.06] bg-white px-3.5 py-2 text-sm font-medium text-[#18181B]"
    >
      {Icon && <Icon size={15} className="text-[#71717A]" />}
      {children}
    </motion.button>
  );
}

export function FilterChip({ children }: { children: React.ReactNode }) {
  return (
    <button className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-[#F4F3FF] px-3 py-1.5 text-xs font-medium text-[#4F46E5] hover:bg-[#ECEBFF]">
      {children}
    </button>
  );
}

export function ManagerFilterBar() {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-white p-2.5 shadow-[0_8px_30px_rgba(24,24,27,0.06)]">
      <FilterChip>Date Range: Last 30 days ▾</FilterChip>
      <FilterChip>Compare Previous Period</FilterChip>
      <FilterChip>Rep: All ▾</FilterChip>
      <FilterChip>Source: All ▾</FilterChip>
      <FilterChip>Campaign: All ▾</FilterChip>
    </div>
  );
}

export function KpiCard({
  icon: Icon,
  tint,
  value,
  label,
  trend,
}: {
  icon: LucideIcon;
  tint: string;
  value: string;
  label: string;
  trend?: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-[0_1px_2px_rgba(24,24,27,0.04)]">
      <div className="flex items-center justify-between">
        <span className={`flex h-8 w-8 items-center justify-center rounded-xl ${tint}`}>
          <Icon size={16} />
        </span>
        {trend && <span className="rounded-full bg-[#F4F4F5] px-1.5 py-0.5 text-[10px] font-medium text-[#52525B]">{trend}</span>}
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
      <p className="text-xs text-[#71717A]">{label}</p>
    </div>
  );
}

export type NavItem = { label: string; icon: LucideIcon; href: string };

export function Sidebar({
  items,
  activeLabel,
  userName = "Hekal",
  userRole = "Sales Rep",
}: {
  items: NavItem[];
  activeLabel: string;
  userName?: string;
  userRole?: string;
}) {
  return (
    <aside className="hidden w-64 shrink-0 flex-col bg-[#F5F5FA] p-3 md:flex">
      <Link href="/design-preview" className="flex items-center gap-2 rounded-xl px-2.5 py-2 hover:bg-white/70">
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold text-white ${BRAND_GRADIENT}`}>
          S
        </div>
        <span className="flex-1 truncate text-sm font-semibold tracking-tight text-[#18181B]">Sales Intelligence</span>
        <ChevronsUpDown size={14} className="text-[#A1A1AA]" />
      </Link>

      <nav className="mt-6 flex-1 space-y-1 text-sm">
        {items.map((item) => {
          const isActive = activeLabel === item.label;
          const Icon = item.icon;
          return (
            <Link key={item.label} href={item.href} className="relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5">
              {isActive && (
                <motion.div layoutId="nav-active" className="absolute inset-0 rounded-xl bg-[#ECEBFF]" transition={{ duration: 0.2 }} />
              )}
              <Icon size={18} className={`relative z-10 ${isActive ? "text-[#635BFF]" : "text-[#71717A]"}`} />
              <span className={`relative z-10 ${isActive ? "font-medium text-[#4F46E5]" : "text-[#3F3F46]"}`}>{item.label}</span>
              {isActive && <span className="relative z-10 ml-auto h-1.5 w-1.5 rounded-full bg-[#635BFF]" />}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex items-center gap-2.5 rounded-xl px-2.5 py-2.5 hover:bg-white/70">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ECEBFF] text-xs font-semibold text-[#4F46E5]">
          {userName.slice(0, 1)}
        </div>
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-[#18181B]">{userName}</p>
          <p className="truncate text-[11px] text-[#A1A1AA]">{userRole}</p>
        </div>
      </div>
    </aside>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="relative -mt-2 -mx-2 overflow-hidden px-2 pt-2">
      <div className="pointer-events-none absolute -left-8 -top-20 h-56 w-56 rounded-full bg-[#8B5CF6]/10 blur-3xl" aria-hidden />
      <div className="relative flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-[#18181B]">{title}</h1>
          <p className="mt-1 text-sm text-[#71717A]">{subtitle}</p>
        </div>
        {action}
      </div>
    </header>
  );
}

export function SectionCard({ title, children, action }: { title?: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(24,24,27,0.04)]">
      {title && (
        <div className="flex items-center justify-between border-b border-black/[0.04] px-4 py-3">
          <h2 className="text-sm font-medium">{title}</h2>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
