"use client"

import { motion } from "framer-motion"
import { useAuthStore } from "@/store/auth"
import { hasAccess } from "@/lib/types"
import { StatCard } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import {
  Calendar,
  Users,
  FileText,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
} from "lucide-react"
import Link from "next/link"

const stagger = { animate: { transition: { staggerChildren: 0.07 } } }
const fadeUp  = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.38 } },
}

const upcomingEvents = [
  { id: "1", title: "AI Design Sessions — Jan 2026",       date: "Jan 15", type: "online",  attendees: 64 },
  { id: "2", title: "Global Design Systems Forum",         date: "Feb 10", type: "hybrid",  attendees: 92 },
  { id: "3", title: "Impulse India 2026 — Human Spark!",  date: "May 20", type: "offline", attendees: 200 },
]

const recentActivity = [
  { icon: "🚀", text: "Impulse India 2026 planning kickoff",        time: "1h ago" },
  { icon: "✍️", text: "AI Sessions newsletter generated",           time: "4h ago" },
  { icon: "👤", text: "Anika Mehra joined the community",           time: "1d ago" },
  { icon: "🏆", text: "Impulse 2025 recap article published",       time: "3d ago" },
]

const quickActions = [
  { label: "Create Event",      href: "/dashboard/events",   icon: <Calendar size={16} />, bg: "#eff6ff",  color: "#2563eb" },
  { label: "Generate Content",  href: "/dashboard/content",  icon: <Sparkles size={16} />, bg: "#f5f3ff",  color: "#7c3aed", badge: "AI" },
  { label: "New Project",       href: "/dashboard/projects", icon: <FileText size={16} />, bg: "#fff1f2",  color: "#f43f5e" },
  { label: "View Community",    href: "/dashboard/community",icon: <Users    size={16} />, bg: "#fffbeb",  color: "#d97706" },
]

const typeVariant: Record<string, "brand" | "accent" | "success"> = {
  online:  "accent",
  offline: "success",
  hybrid:  "brand",
}

export default function DashboardPage() {
  const { user } = useAuthStore()
  if (!user) return null

  const isCore = hasAccess(user.role, "core_member")

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return "Good morning"
    if (h < 17) return "Good afternoon"
    return "Good evening"
  }

  return (
    <motion.div variants={stagger} initial="initial" animate="animate" className="max-w-6xl mx-auto w-full">

      {/* Welcome banner */}
      <motion.div variants={fadeUp} className="mb-6">
        <div className="relative rounded-2xl overflow-hidden bg-[#080d25] p-6 sm:p-8 text-white">
          {/* Subtle glow */}
          <div className="pointer-events-none absolute top-0 right-0 w-72 h-72 bg-[#2563eb]/12 blur-[80px] rounded-full" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 w-48 h-48 bg-[#7c3aed]/10 blur-[80px] rounded-full" />
          <div className="relative z-10">
            <p className="text-white/40 text-sm mb-1">{greeting()},</p>
            <h2 className="text-xl sm:text-2xl font-bold mb-1">{user.name}</h2>
            <p className="text-white/40 text-sm">
              Welcome back to Design Hub India. Here&apos;s what&apos;s happening in 2026.
            </p>
            {isCore && (
              <div className="mt-5">
                <Link
                  href="/dashboard/content"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/8 hover:bg-white/14 text-sm font-semibold text-white border border-white/10 transition-colors"
                >
                  <Sparkles size={14} /> Open AI Studio
                </Link>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Stats row */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <StatCard label="Upcoming Events" value="6"   icon={<Calendar   size={17} />} trend={{ value: 50, positive: true }} />
        <StatCard label="Community"       value="200+"icon={<Users      size={17} />} trend={{ value: 12, positive: true }} />
        <StatCard label="Articles"        value="28"  icon={<FileText   size={17} />} trend={{ value: 8,  positive: true }} />
        <StatCard label="Initiatives"     value="6"   icon={<TrendingUp size={17} />} />
      </motion.div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">

        {/* Upcoming Events */}
        <motion.div variants={fadeUp} className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-[#e2e7f5] p-5 sm:p-6 h-full">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-[#121840] text-sm sm:text-base">Upcoming Events · 2026</h3>
              <Link href="/dashboard/events" className="text-xs text-[#2563eb] hover:underline flex items-center gap-1">
                View all <ArrowRight size={11} />
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center gap-3 sm:gap-4 p-3 rounded-xl hover:bg-[#f8faff] transition-colors cursor-pointer group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#eff6ff] border border-[#bfdbfe] flex flex-col items-center justify-center shrink-0">
                    <span className="text-[11px] font-bold text-[#2563eb] leading-none">{event.date.split(" ")[0]}</span>
                    <span className="text-[9px] text-[#60a5fa]">{event.date.split(" ")[1]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#1e2856] truncate group-hover:text-[#2563eb] transition-colors">
                      {event.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={typeVariant[event.type]} size="sm">{event.type}</Badge>
                      <span className="text-[11px] text-[#8896c4] flex items-center gap-1">
                        <Users size={9} /> {event.attendees} RSVPs
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={13} className="text-[#c4cde8] group-hover:text-[#2563eb] transition-colors shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right column */}
        <div className="flex flex-col gap-4">

          {/* Quick Actions */}
          {isCore && (
            <motion.div variants={fadeUp}>
              <div className="bg-white rounded-2xl border border-[#e2e7f5] p-5">
                <h3 className="font-bold text-[#121840] text-sm mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action) => (
                    <Link key={action.label} href={action.href}>
                      <div className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-[#f8faff] border border-transparent hover:border-[#e2e7f5] transition-all cursor-pointer text-center">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center"
                          style={{ background: action.bg, color: action.color }}
                        >
                          {action.icon}
                        </div>
                        <span className="text-xs font-medium text-[#2d3a6b] leading-tight">{action.label}</span>
                        {action.badge && (
                          <span className="text-[8px] px-1.5 py-0.5 bg-[#f5f3ff] text-[#7c3aed] rounded-full font-bold">
                            {action.badge}
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Recent Activity */}
          <motion.div variants={fadeUp}>
            <div className="bg-white rounded-2xl border border-[#e2e7f5] p-5">
              <h3 className="font-bold text-[#121840] text-sm mb-4">Recent Activity</h3>
              <div className="flex flex-col gap-3">
                {recentActivity.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-base mt-0.5 shrink-0">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#2d3a6b] leading-relaxed">{item.text}</p>
                      <div className="flex items-center gap-1 mt-0.5 text-[10px] text-[#8896c4]">
                        <Clock size={9} /> {item.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
