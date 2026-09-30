"use client";

import { Mail, Shield, Building2 } from "lucide-react";
import { PageHeader, SectionCard } from "../../_lib/ui";

export default function RepProfilePage() {
  return (
    <>
      <PageHeader title="Profile" subtitle="Your account details" />
      <SectionCard>
        <div className="flex items-center gap-4 p-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF2FF] text-lg font-semibold text-[#4F46E5]">
            H
          </div>
          <div>
            <h3 className="text-base font-semibold">Hekal</h3>
            <p className="text-sm text-[#71717A]">Sales Representative</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 border-t border-[#F0F0F2] p-6 text-sm sm:grid-cols-3">
          <div className="flex items-center gap-2">
            <Mail size={14} className="text-[#71717A]" />
            <span>hekal@salesintel.io</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 size={14} className="text-[#71717A]" />
            <span>Sales Intelligence Pilot Org</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield size={14} className="text-[#71717A]" />
            <span>Role: Rep</span>
          </div>
        </div>
      </SectionCard>
    </>
  );
}
