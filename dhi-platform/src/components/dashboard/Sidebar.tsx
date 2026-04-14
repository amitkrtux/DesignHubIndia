"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Calendar,
  Users,
  FileEdit,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
  DollarSign,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/store/auth"
import { hasAccess } from "@/lib/types"
import { DHIWordmark } from "@/components/ui/Logo"

const navItems = [
  { label: "Overview",       href: "/dashboard",             icon: <LayoutDashboard size={17} />, roles: ["member","core_member","hub_lead"] as const },
  { label: "Events",         href: "/dashboard/events",       icon: <Calendar        size={17} />, roles: ["member","core_member","hub_lead"] as const },
  { label: "Initiatives",    href: "/dashboard/initiatives",  icon: <Layers          size={17} />, roles: ["member","core_member","hub_lead"] as const },
  { label: "Content Studio", href: "/dashboard/content",      icon: <Sparkles        size={17} />, roles: ["core_member","hub_lead"] as const, badge: "AI" },
  { label: "Projects",       href: "/dashboard/projects",     icon: <FileEdit        size={17} />, roles: ["core_member","hub_lead"] as const },
  { label: "Community",      href: "/dashboard/community",    icon: <Users           size={17} />, roles: ["member","core_member","hub_lead"] as const },
  { label: "Budget",         href: "/dashboard/budget",       icon: <DollarSign      size={17} />, roles: ["hub_lead"] as const, restricted: true },
  { label: "Analytics",      href: "/dashboard/analytics",    icon: <BarChart2       size={17} />, roles: ["core_member","hub_lead"] as const },
  { label: "Settings",       href: "/dashboard/settings",     icon: <Settings        size={17} />, roles: ["member","core_member","hub_lead"] as const },
]

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const { user } = useAuthStore()

  if (!user) return null

  const visibleItems = navItems.filter((item) =>
    item.roles.some((role) => hasAccess(user.role, role))
  )

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 232 }}
      transition={{ duration: 0.22, ease: "easeInOut" }}
      className="relative flex flex-col bg-white border-r border-[#e2e7f5] h-full overflow-hidden shrink-0"
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-4 mb-1 min-h-[60px]">
        {collapsed ? (
          <div className="mx-auto">
            <DHIWordmark bg="light" size="sm" />
          </div>
        ) : (
          <DHIWordmark bg="light" size="md" />
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2.5 overflow-y-auto">
        <div className="flex flex-col gap-0.5">
          {visibleItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={cn(
                  "flex items-center gap-3 px-3 h-9 rounded-xl text-sm font-medium transition-all duration-150 relative",
                  isActive
                    ? "bg-[#eff6ff] text-[#2563eb]"
                    : "text-[#5567a3] hover:bg-[#f8faff] hover:text-[#121840]",
                  item.restricted && !isActive && "text-[#c4cde8]",
                  collapsed && "justify-center px-0"
                )}
              >
                <span className="shrink-0">{item.icon}</span>
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.13 }}
                      className="flex-1 whitespace-nowrap flex items-center justify-between overflow-hidden"
                    >
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span className="ml-1 shrink-0 text-[9px] px-1.5 py-0.5 rounded-full bg-[#f5f3ff] text-[#7c3aed] font-bold">
                          {item.badge}
                        </span>
                      )}
                      {item.restricted && (
                        <span className="ml-1 shrink-0 text-[9px] px-1.5 py-0.5 rounded-full bg-[#fffbeb] text-[#d97706] font-bold">
                          Lead
                        </span>
                      )}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-[#eff6ff] rounded-xl -z-10"
                  />
                )}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* User info */}
      <div className="p-2.5 border-t border-[#e2e7f5]">
        <div className={cn("flex items-center gap-2.5 px-2.5 py-2 rounded-xl", collapsed && "justify-center")}>
          <div className="w-8 h-8 rounded-full bg-[#eff6ff] border border-[#bfdbfe] flex items-center justify-center text-[#2563eb] text-xs font-bold shrink-0">
            {user.name.charAt(0)}
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="overflow-hidden min-w-0"
              >
                <p className="text-xs font-semibold text-[#1e2856] truncate leading-none mb-0.5">{user.name}</p>
                <p className="text-[10px] text-[#8896c4] truncate">{user.role.replace("_", " ")}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-4 -right-3 w-6 h-6 rounded-full bg-white border border-[#e2e7f5] shadow-sm flex items-center justify-center hover:bg-[#f8faff] transition-colors z-10"
      >
        {collapsed ? <ChevronRight size={11} className="text-[#8896c4]" /> : <ChevronLeft size={11} className="text-[#8896c4]" />}
      </button>
    </motion.aside>
  )
}
