"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const tracks = [
  {
    id: "01",
    title: "Human",
    tagline: "Empathy at the core",
    body: "Designing for human complexity — accessibility, emotion, culture, and the full spectrum of human experience.",
    color: "#fb7185",
  },
  {
    id: "02",
    title: "Intelligence",
    tagline: "AI as a creative partner",
    body: "Exploring AI-assisted design workflows, generative UI, and what it means to co-create with machines.",
    color: "#a78bfa",
  },
  {
    id: "03",
    title: "Systems",
    tagline: "Design at scale",
    body: "Design systems, component libraries, and the infrastructure that lets great design scale globally.",
    color: "#60a5fa",
  },
  {
    id: "04",
    title: "Futures",
    tagline: "What comes next",
    body: "Speculative design, emerging tech, and bold experiments in what enterprise design could become.",
    color: "#fbbf24",
  },
]

const partners = ["DesignUp", "ADPList", "Frog", "MIT Media Lab", "IDEO"]

export function ImpulseSection() {
  return (
    <section id="impulse" className="relative bg-[#080d25] py-24 sm:py-28 lg:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[280px] rounded-full bg-[#7c3aed]/10 blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-14 sm:mb-16"
        >
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#a78bfa]">
              Flagship Event
            </span>
            <span className="px-3 py-1 rounded-full bg-[#f43f5e]/15 text-[#fb7185] text-xs font-bold">
              2026
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-4">
            Impulse India 2026
          </h2>
          <p className="text-xl sm:text-2xl font-light text-white/70 italic mb-6">
            "Human Spark!"
          </p>
          <p className="text-base text-white/75 max-w-2xl leading-relaxed">
            India&apos;s largest internal SAP design festival returns — a multi-day
            celebration of craft, community, and the future of design. Four tracks,
            global speakers, and 200+ designers converging around one big idea:{" "}
            <span className="text-white/80 font-medium">the spark that makes us human.</span>
          </p>
        </motion.div>

        {/* Tracks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-12">
          {tracks.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="p-6 sm:p-7 rounded-2xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
            >
              <span className="text-[10px] font-mono uppercase tracking-widest block mb-5" style={{ color: t.color }}>
                Track {t.id}
              </span>
              <h3 className="text-xl font-bold text-white mb-1.5">{t.title}</h3>
              <p className="text-xs font-semibold mb-4" style={{ color: t.color }}>{t.tagline}</p>
              <p className="text-sm text-white/65 leading-relaxed">{t.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Partners row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/50">
              Partners
            </span>
            {partners.map((p) => (
              <span key={p} className="px-3.5 py-1.5 rounded-full border border-white/15 text-xs text-white/65 font-medium">
                {p}
              </span>
            ))}
          </div>
          <Link
            href="/auth"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#7c3aed]/40 bg-[#7c3aed]/10 text-[#a78bfa] text-sm font-semibold hover:bg-[#7c3aed]/20 transition-colors"
          >
            Register Interest <ArrowRight size={13} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
