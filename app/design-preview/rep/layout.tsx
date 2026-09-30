"use client";

import { usePathname } from "next/navigation";
import { LayoutGrid, BarChart3, Clock, UserCircle } from "lucide-react";
import { Sidebar, type NavItem } from "../_lib/ui";

const navItems: NavItem[] = [
  { label: "My Leads", icon: LayoutGrid, href: "/design-preview/rep/leads" },
  { label: "My Performance", icon: BarChart3, href: "/design-preview/rep/performance" },
  { label: "Follow-Ups", icon: Clock, href: "/design-preview/rep/follow-ups" },
  { label: "Profile", icon: UserCircle, href: "/design-preview/rep/profile" },
];

export default function RepLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const active = navItems.find((item) => pathname?.startsWith(item.href))?.label ?? "My Leads";

  return (
    <div className="min-h-screen bg-[#F8F8FC] font-sans text-[#18181B]">
      <div className="flex">
        <Sidebar items={navItems} activeLabel={active} userName="Hekal" userRole="Sales Rep" />
        <main className="min-w-0 flex-1 space-y-6 p-8">{children}</main>
      </div>
    </div>
  );
}
