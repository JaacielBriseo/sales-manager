"use client";

import { dashboardRoutes } from "@/lib/constants";
import { SidebarItem } from "./sidebar-item";


export const SidebarRoutes = () => {

  return (
    <div className="flex flex-col w-full">
      {dashboardRoutes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}