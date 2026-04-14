"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/Badge"
import { CheckCircle2, Circle, Clock } from "lucide-react"

const phases = [
  {
    id: 1,
    title: "Platform Launch",
    period: "Q1 2025",
    status: "completed" as const,
    items: [
      "Public website live",
      "Member authentication",
      "Role-based dashboard",
      "Core member portal",
    ],
  },
  {
    id: 2,
    title: "AI Content Studio",
    period: "Q2 2025",
    status: "in_progress" as const,
    items: [
      "Newsletter generation",
      "LinkedIn post drafts",
      "Event announcements",
      "Claude API integration",
    ],
  },
  {
    id: 3,
    title: "Events & CMS",
    period: "Q3 2025",
    status: "planned" as const,
    items: [
      "Full event management",
      "RSVP & attendee system",
      "CMS for website",
      "Email notifications",
    ],
  },
  {
    id: 4,
    title: "Project Management",
    period: "Q4 2025",
    status: "planned" as const,
    items: [
      "Kanban board",
      "Task management",
      "Timeline view",
      "Team collaboration",
    ],
  },
  {
    id: 5,
    title: "Budget & Analytics",
    period: "Q1 2026",
    status: "planned" as const,
    items: [
      "Budget management",
      "Expense tracking",
      "Analytics dashboard",
      "Vendor management",
    ],
  },
]

const statusConfig = {
  completed: {
    label: "Completed",
    variant: "success" as const,
    icon: <CheckCircle2 size={16} className="text-emerald-500" />,
    barColor: "bg-emerald-500",
    cardBg: "bg-emerald-50 border-emerald-100",
  },
  in_progress: {
    label: "In Progress",
    variant: "brand" as const,
    icon: <Clock size={16} className="text-orange-500" />,
    barColor: "bg-orange-500",
    cardBg: "bg-orange-50 border-orange-100",
  },
  planned: {
    label: "Planned",
    variant: "default" as const,
    icon: <Circle size={16} className="text-neutral-400" />,
    barColor: "bg-neutral-200",
    cardBg: "bg-white border-neutral-100",
  },
}

export function RoadmapSection() {
  return (
    <section id="roadmap" className="py-28 bg-neutral-950 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 blur-[80px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <Badge variant="brand" size="md" className="mb-4">Plan for the Year</Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            2025 Roadmap
          </h2>
          <p className="text-lg text-neutral-400 leading-relaxed">
            A phased approach to building the most powerful design community
            platform in the enterprise world.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-[52px] left-[10%] right-[10%] h-0.5 bg-white/5" />

          {phases.map((phase, i) => {
            const config = statusConfig[phase.status]
            return (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                {/* Phase number bubble */}
                <div className="flex md:justify-center mb-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 z-10 ${
                      phase.status === "completed"
                        ? "bg-emerald-500 border-emerald-400 text-white"
                        : phase.status === "in_progress"
                        ? "bg-orange-500 border-orange-400 text-white"
                        : "bg-neutral-800 border-neutral-700 text-neutral-400"
                    }`}
                  >
                    {phase.id}
                  </div>
                </div>

                {/* Card */}
                <div
                  className={`rounded-2xl border p-5 ${
                    phase.status === "completed"
                      ? "bg-emerald-950/30 border-emerald-800/30"
                      : phase.status === "in_progress"
                      ? "bg-orange-950/30 border-orange-800/30"
                      : "bg-white/3 border-white/6"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant={config.variant} size="sm">
                      {config.label}
                    </Badge>
                    <span className="text-[10px] text-neutral-500 font-medium">{phase.period}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-3">{phase.title}</h3>
                  <ul className="flex flex-col gap-1.5">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        {config.icon}
                        <span className="text-xs text-neutral-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
