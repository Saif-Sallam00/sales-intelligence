"use client";

import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, GitBranch, Radio, Megaphone, Clock, Settings } from "lucide-react";
import { Sidebar, type NavItem } from "../_lib/ui";

const navItems: NavItem[] = [
  { label: "Overview", icon: LayoutDashboard, href: "/design-preview/manager/overview" },
  { label: "Team", icon: Users, href: "/design-preview/manager/team" },
  { label: "Pipeline", icon: GitBranch, href: "/design-preview/manager/pipeline" },
  { label: "Sources", icon: Radio, href: "/design-preview/manager/sources" },
  { label: "Campaigns", icon: Megaphone, href: "/design-preview/manager/campaigns" },
  { label: "Follow-Ups", icon: Clock, href: "/design-preview/manager/follow-ups" },
  { label: "Settings", icon: Settings, href: "/design-preview/manager/settings" },
];

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const active = navItems.find((item) => pathname?.startsWith(item.href))?.label ?? "Overview";

  return (
    <div className="min-h-screen bg-[#F8F8FC] font-sans text-[#18181B]">
      <div className="flex">
        <Sidebar items={navItems} activeLabel={active} userName="Manager" userRole="Sales Manager" />
        <main className="min-w-0 flex-1 space-y-6 p-8">{children}</main>
      </div>
    </div>
  );
}
