"use client"

import { usePathname } from "next/navigation"
import { Bell, Search, LogOut, Menu } from "lucide-react"
import { useAuthStore } from "@/store/auth"
import { RoleBadge } from "@/components/ui/Badge"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"

const pageTitles: Record<string, string> = {
  "/dashboard":            "Overview",
  "/dashboard/events":     "Events",
  "/dashboard/initiatives":"Initiatives",
  "/dashboard/content":    "AI Content Studio",
  "/dashboard/projects":   "Projects",
  "/dashboard/community":  "Community",
  "/dashboard/budget":     "Budget",
  "/dashboard/analytics":  "Analytics",
  "/dashboard/settings":   "Settings",
}

export function DashboardHeader() {
  const pathname = usePathname()
  const { user, logout } = useAuthStore()
  const router = useRouter()

  const title = pageTitles[pathname] || "Dashboard"

  async function handleLogout() {
    await logout()
    router.push("/")
  }

  return (
    <header className="h-14 sm:h-16 bg-white border-b border-[#e2e7f5] flex items-center justify-between px-4 sm:px-6 shrink-0 gap-3">
      {/* Left */}
      <div className="flex items-center gap-2.5 min-w-0">
        <h1 className="text-base sm:text-lg font-bold text-[#121840] truncate">{title}</h1>
        {pathname === "/dashboard/content" && (
          <span className="hidden sm:inline-flex text-[10px] px-2 py-0.5 rounded-full bg-[#f5f3ff] text-[#7c3aed] font-bold uppercase tracking-wider shrink-0">
            AI Powered
          </span>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-1.5 shrink-0">
        {/* Search */}
        <button className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl hover:bg-[#f8faff] flex items-center justify-center text-[#8896c4] hover:text-[#2563eb] transition-colors">
          <Search size={15} />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl hover:bg-[#f8faff] flex items-center justify-center text-[#8896c4] hover:text-[#2563eb] transition-colors">
            <Bell size={15} />
          </button>
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#f43f5e]" />
        </div>

        {/* User */}
        {user && (
          <div className="flex items-center gap-2 ml-1 pl-3 border-l border-[#e2e7f5]">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-[#1e2856] leading-none mb-1">{user.name}</p>
              <RoleBadge role={user.role} />
            </div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#eff6ff] border border-[#bfdbfe] flex items-center justify-center text-[#2563eb] text-xs font-bold">
              {user.name.charAt(0)}
            </div>
            <button
              onClick={handleLogout}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl hover:bg-[#fff1f2] hover:text-[#f43f5e] flex items-center justify-center text-[#c4cde8] transition-colors"
              title="Sign out"
            >
              <LogOut size={14} />
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
