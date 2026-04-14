"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Plus, Search, Filter, MapPin, Video, Layers, Users, Calendar } from "lucide-react"
import { useState } from "react"
import { useAuthStore } from "@/store/auth"
import { hasAccess } from "@/lib/types"
import { formatDate } from "@/lib/utils"

const events = [
  {
    id: "1",
    title: "Design Sprint Q2 2025",
    type: "hybrid",
    date: "2025-04-18",
    location: "SAP Labs, Bengaluru",
    status: "published",
    rsvpCount: 42,
    maxAttendees: 60,
    tags: ["Sprint", "Workshop"],
  },
  {
    id: "2",
    title: "AI + Design Workshop",
    type: "online",
    date: "2025-04-25",
    status: "published",
    rsvpCount: 78,
    tags: ["AI", "Workshop"],
  },
  {
    id: "3",
    title: "Community Showcase 2025",
    type: "offline",
    date: "2025-05-20",
    location: "SAP Labs, Hyderabad",
    status: "draft",
    rsvpCount: 0,
    maxAttendees: 150,
    tags: ["Showcase", "Annual"],
  },
  {
    id: "4",
    title: "Design Systems Roundtable",
    type: "online",
    date: "2025-06-10",
    status: "draft",
    rsvpCount: 0,
    tags: ["Design Systems"],
  },
]

const typeConfig = {
  online: { icon: <Video size={12} />, label: "Online", variant: "accent" as const },
  offline: { icon: <MapPin size={12} />, label: "In-Person", variant: "success" as const },
  hybrid: { icon: <Layers size={12} />, label: "Hybrid", variant: "brand" as const },
}

export default function EventsPage() {
  const [search, setSearch] = useState("")
  const { user } = useAuthStore()
  const canCreate = user && hasAccess(user.role, "core_member")

  const filtered = events.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Events</h1>
          <p className="text-sm text-neutral-500 mt-0.5">{events.length} total events</p>
        </div>
        {canCreate && (
          <Button variant="primary" size="md" icon={<Plus size={16} />}>
            Create Event
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-11 pl-10 pr-4 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 bg-white"
        />
      </div>

      {/* Events list */}
      <div className="flex flex-col gap-3">
        {filtered.map((event, i) => {
          const typeInfo = typeConfig[event.type as keyof typeof typeConfig]
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="group bg-white rounded-2xl border border-black/6 p-4 hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                {/* Date block */}
                <div className="w-14 h-14 rounded-xl bg-orange-50 border border-orange-100 flex flex-col items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-orange-600">
                    {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric" })}
                  </span>
                  <span className="text-[10px] text-orange-400 font-medium">
                    {new Date(event.date).toLocaleDateString("en-IN", { month: "short" })}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold text-neutral-900 truncate group-hover:text-orange-600 transition-colors">
                      {event.title}
                    </h3>
                    <Badge variant={event.status === "published" ? "success" : "default"} size="sm">
                      {event.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-neutral-400">
                    <Badge variant={typeInfo.variant} size="sm">
                      <span className="flex items-center gap-1">{typeInfo.icon} {typeInfo.label}</span>
                    </Badge>
                    {event.location && (
                      <span className="flex items-center gap-1"><MapPin size={10} /> {event.location}</span>
                    )}
                    <span className="flex items-center gap-1">
                      <Users size={10} /> {event.rsvpCount}
                      {event.maxAttendees ? ` / ${event.maxAttendees}` : ""} RSVPs
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div className="hidden sm:flex gap-1.5 shrink-0">
                  {event.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 bg-neutral-100 text-neutral-500 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {canCreate && (
                  <div className="flex gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
