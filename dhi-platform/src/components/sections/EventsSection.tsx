"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, MapPin, Video, Layers, Calendar, Users } from "lucide-react"
import { formatShortDate } from "@/lib/utils"

const pastEvents = [
  {
    id: "1",
    title: "Design Sprint: Reimagining SAP Fiori",
    type: "hybrid" as const,
    date: "2025-03-15",
    location: "SAP Labs, Bengaluru",
    description: "2-day intensive design sprint reimagining Fiori for the next generation of enterprise users.",
    rsvpCount: 84,
    tags: ["Design Sprint", "Fiori"],
  },
  {
    id: "2",
    title: "AI + Design: Building Intelligent Experiences",
    type: "online" as const,
    date: "2025-04-08",
    location: "Online",
    description: "Exploring how AI transforms the design process — from generative UI to intelligent design systems.",
    rsvpCount: 156,
    tags: ["AI", "Design Systems"],
  },
  {
    id: "3",
    title: "Community Design Showcase 2025",
    type: "offline" as const,
    date: "2025-05-20",
    location: "SAP Labs, Hyderabad",
    description: "Annual showcase featuring the best design work from SAP India — celebrating community excellence.",
    rsvpCount: 210,
    tags: ["Showcase", "Annual"],
  },
]

const typeIcon = {
  online:  { Icon: Video,  label: "Online" },
  offline: { Icon: MapPin, label: "In-Person" },
  hybrid:  { Icon: Layers, label: "Hybrid" },
}

export function EventsSection() {
  return (
    <section id="events" data-theme="light" className="bg-[#f8faff] py-24 sm:py-28 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12 sm:mb-14"
        >
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#2563eb] mb-4">
              What We Did · 2025
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#121840] leading-[1.15]">
              Events Recap
            </h2>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#374375] hover:text-[#2563eb] transition-colors flex-shrink-0"
          >
            View all <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {pastEvents.map((event, i) => {
            const { Icon, label } = typeIcon[event.type]
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-white rounded-2xl border border-[#e2e7f5] p-6 sm:p-7 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/40 transition-all duration-300 flex flex-col gap-4"
              >
                {/* Meta */}
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-[#374375]">
                    <Icon size={12} className="text-[#2563eb]" /> {label}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-[#5567a3]">
                    <Calendar size={11} /> {formatShortDate(event.date)}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#121840] leading-snug group-hover:text-[#2563eb] transition-colors">
                  {event.title}
                </h3>
                <p className="text-sm text-[#374375] leading-relaxed line-clamp-2 flex-1">
                  {event.description}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-[#5567a3]">
                  <MapPin size={11} /> {event.location}
                </div>

                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-1 bg-[#eff6ff] text-[#2563eb] rounded-full font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#5567a3] pt-3 border-t border-[#e2e7f5]">
                  <Users size={11} /> {event.rsvpCount} attended
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
