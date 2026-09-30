"use client";

import { Bot, CheckCircle2 } from "lucide-react";
import { PageHeader, SectionCard, SecondaryButton } from "../../_lib/ui";

export default function ManagerSettingsPage() {
  return (
    <>
      <PageHeader title="Settings" subtitle="AI Connection" />
      <SectionCard>
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EEF2FF] text-[#4F46E5]">
              <Bot size={18} />
            </span>
            <div>
              <p className="text-sm font-medium">AI Assistant Access</p>
              <p className="flex items-center gap-1 text-xs text-[#71717A]">
                <CheckCircle2 size={12} className="text-emerald-500" /> Connected · read-only · manager-scoped
              </p>
            </div>
          </div>
          <SecondaryButton>Manage</SecondaryButton>
        </div>
      </SectionCard>
    </>
  );
}
