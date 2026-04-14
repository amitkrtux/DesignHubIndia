"use client"

import { motion } from "framer-motion"

const initiatives = [
  {
    num: "01",
    category: "Events",
    title: "Design Sprints & Workshops",
    body: "Hands-on design sprints, skill-building workshops, and critique sessions led by practitioners across SAP globally.",
    stat: "24+ events",
    color: "#2563eb",
    pill: "bg-[#eff6ff] text-[#2563eb]",
  },
  {
    num: "02",
    category: "Community",
    title: "Peer Learning & Mentorship",
    body: "Structured mentorship programs and peer learning across all 9 global hubs. Every designer has a guide.",
    stat: "200+ members",
    color: "#7c3aed",
    pill: "bg-[#f5f3ff] text-[#7c3aed]",
  },
  {
    num: "03",
    category: "Learning",
    title: "Curated Learning Paths",
    body: "Tracks covering UX research, visual design, design systems, AI-assisted design, and design leadership.",
    stat: "12 tracks",
    color: "#f43f5e",
    pill: "bg-[#fff1f2] text-[#f43f5e]",
  },
  {
    num: "04",
    category: "Media",
    title: "Newsletter & Thought Leadership",
    body: "Monthly newsletter, LinkedIn features, and articles that put India's design thinking on the global map.",
    stat: "28 articles",
    color: "#f59e0b",
    pill: "bg-[#fffbeb] text-[#d97706]",
  },
]

export function InitiativesSection() {
  return (
    <section id="initiatives" className="bg-white py-24 sm:py-28 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#2563eb] mb-4">
            What We Do
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#121840] leading-[1.15]">
            Our Initiatives
          </h2>
        </motion.div>

        {/* 2×2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {initiatives.map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group p-8 sm:p-10 rounded-2xl border border-[#e2e7f5] bg-white hover:border-transparent hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-[10px] font-mono text-[#c4cde8] uppercase tracking-widest">
                  {item.num}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${item.pill}`}>
                  {item.category}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#121840] mb-3 leading-snug">
                {item.title}
              </h3>
              <p className="text-sm text-[#5567a3] leading-relaxed mb-8">
                {item.body}
              </p>
              <p className="text-sm font-bold" style={{ color: item.color }}>
                {item.stat}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
