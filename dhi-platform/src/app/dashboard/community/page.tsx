"use client"

import { motion } from "framer-motion"
import { Badge, RoleBadge } from "@/components/ui/Badge"
import { StatCard } from "@/components/ui/Card"
import { Search, Users, UserCheck, Star, Shield } from "lucide-react"
import { useState } from "react"

const members = [
  { id: "1", name: "Aakash Sharma", role: "hub_lead", email: "aakash@sap.com", joinedAt: "2022-01-15", location: "Bengaluru", expertise: ["Design Strategy", "UX Leadership"] },
  { id: "2", name: "Priya Nair", role: "core_member", email: "priya.nair@sap.com", joinedAt: "2023-03-10", location: "Bengaluru", expertise: ["UX Research", "Service Design"] },
  { id: "3", name: "Rahul Mehta", role: "core_member", email: "rahul.mehta@sap.com", joinedAt: "2023-06-01", location: "Hyderabad", expertise: ["Visual Design", "Design Systems"] },
  { id: "4", name: "Kavya Reddy", role: "member", email: "kavya.reddy@sap.com", joinedAt: "2024-01-20", location: "Pune", expertise: ["Interaction Design"] },
  { id: "5", name: "Arjun Singh", role: "member", email: "arjun.singh@sap.com", joinedAt: "2024-02-14", location: "Bengaluru", expertise: ["Motion Design"] },
  { id: "6", name: "Sneha Patel", role: "member", email: "sneha.patel@sap.com", joinedAt: "2024-03-08", location: "Hyderabad", expertise: ["Content Design"] },
  { id: "7", name: "Vikram Kumar", role: "core_member", email: "vikram.kumar@sap.com", joinedAt: "2023-09-20", location: "Mumbai", expertise: ["Accessibility", "Design Systems"] },
  { id: "8", name: "Ananya Joshi", role: "member", email: "ananya.joshi@sap.com", joinedAt: "2024-04-01", location: "Bengaluru", expertise: ["AI Design", "Prototyping"] },
]

export default function CommunityPage() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")

  const filtered = members.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.location.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === "all" || m.role === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Community</h1>
        <p className="text-sm text-neutral-500 mt-0.5">{members.length} members across India</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Members" value={members.length} icon={<Users size={16} />} />
        <StatCard label="Hub Leads" value={members.filter(m => m.role === "hub_lead").length} icon={<Shield size={16} />} />
        <StatCard label="Core Members" value={members.filter(m => m.role === "core_member").length} icon={<Star size={16} />} />
        <StatCard label="Members" value={members.filter(m => m.role === "member").length} icon={<UserCheck size={16} />} />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 bg-white"
          />
        </div>
        <div className="flex gap-2">
          {["all", "hub_lead", "core_member", "member"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                filter === f ? "bg-orange-500 text-white" : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
              }`}
            >
              {f === "all" ? "All" : f.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase())}
            </button>
          ))}
        </div>
      </div>

      {/* Members grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
            className="bg-white rounded-2xl border border-black/6 p-4 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-violet-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                {member.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-neutral-900 truncate group-hover:text-orange-600 transition-colors">
                  {member.name}
                </p>
                <p className="text-xs text-neutral-400 truncate">{member.email}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <RoleBadge role={member.role} />
                  <span className="text-xs text-neutral-400">{member.location}</span>
                </div>
              </div>
            </div>
            {member.expertise.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-black/5">
                {member.expertise.slice(0, 2).map((skill) => (
                  <span key={skill} className="text-[10px] px-2 py-0.5 bg-neutral-100 text-neutral-500 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
