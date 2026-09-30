// THROWAWAY DESIGN PREVIEW — not part of the product, not linked in nav.
// Landing switcher between the two full mock flows, seeded with fake data:
// /design-preview/rep     — sales rep workspace (My Leads, Performance, Follow-Ups, Profile)
// /design-preview/manager — read-only manager dashboard (Overview, Team, Pipeline, Sources, Campaigns, Follow-Ups, Settings)
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { UserCircle, LayoutDashboard, ArrowRight } from "lucide-react";

function ViewCard({
  href,
  icon: Icon,
  title,
  description,
  tint,
}: {
  href: string;
  icon: typeof UserCircle;
  title: string;
  description: string;
  tint: string;
}) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.15 }}
        className="flex h-full flex-col justify-between rounded-2xl border border-[#E4E4E7] bg-white p-6"
      >
        <div>
          <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tint}`}>
            <Icon size={20} />
          </span>
          <h2 className="mt-4 text-lg font-semibold">{title}</h2>
          <p className="mt-1.5 text-sm text-[#71717A]">{description}</p>
        </div>
        <span className="mt-6 flex items-center gap-1 text-sm font-medium text-[#4F46E5]">
          Open <ArrowRight size={14} />
        </span>
      </motion.div>
    </Link>
  );
}

export default function DesignPreviewIndexPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] p-8">
      <div className="w-full max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Design preview — fake seed data</h1>
          <p className="mt-2 text-sm text-[#71717A]">
            Same visual system, two perspectives. Pick a role to explore what each one sees.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <ViewCard
            href="/design-preview/rep/leads"
            icon={UserCircle}
            title="Sales Rep — Hekal"
            description="My Leads grid, lead detail drawer, My Performance, and Follow-Ups."
            tint="bg-[#EEF2FF] text-[#4F46E5]"
          />
          <ViewCard
            href="/design-preview/manager/overview"
            icon={LayoutDashboard}
            title="Sales Manager"
            description="Org-wide, read-only: Overview, Team, Pipeline, Sources, Campaigns, Follow-Ups."
            tint="bg-violet-50 text-violet-600"
          />
        </div>
      </div>
    </div>
  );
}
