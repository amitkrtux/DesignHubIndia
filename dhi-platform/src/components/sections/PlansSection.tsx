"use client"

import { motion } from "framer-motion"

const plans = [
  { month: "Jan '26", theme: "AI Design Sessions — Series I",    detail: "Monthly deep-dives into AI-assisted design workflows", color: "#60a5fa", flagship: false },
  { month: "Feb '26", theme: "Design Systems Global Forum",       detail: "Cross-hub design systems knowledge exchange",           color: "#a78bfa", flagship: false },
  { month: "Mar '26", theme: "Research & Insights Summit",        detail: "UX research methods, global user studies, AI-assisted", color: "#fb7185", flagship: false },
  { month: "Apr '26", theme: "AI Design Sessions — Series II",    detail: "Generative UI and intelligent design system tooling",   color: "#60a5fa", flagship: false },
  { month: "May '26", theme: "Impulse India 2026",                detail: "\"Human Spark!\" — The flagship design festival",       color: "#fbbf24", flagship: true },
  { month: "Jun '26", theme: "Design Leadership Forum",           detail: "Strategy, culture, and growth across 9 global hubs",   color: "#a78bfa", flagship: false },
]

export function PlansSection() {
  return (
    <section id="plans" className="bg-white py-24 sm:py-28 lg:py-32">
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
            Plans Ahead · 2026
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#121840] leading-[1.15]">
            What&apos;s Coming
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {plans.map((p, i) => (
            <motion.div
              key={p.month}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className={`p-7 sm:p-8 rounded-2xl border transition-all duration-300 ${
                p.flagship
                  ? "border-[#f59e0b]/25 bg-[#fffbeb] hover:border-[#f59e0b]/50 hover:shadow-xl hover:shadow-amber-100/50"
                  : "border-[#e2e7f5] bg-white hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/40"
              }`}
            >
              <div className="flex items-center gap-2 mb-5">
                <p className="text-[11px] font-mono uppercase tracking-widest" style={{ color: p.color }}>
                  {p.month}
                </p>
                {p.flagship && (
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f59e0b]/15 text-[#d97706]">
                    Flagship
                  </span>
                )}
              </div>
              <h3 className={`text-base sm:text-[17px] font-bold mb-2 leading-snug ${p.flagship ? "text-[#92400e]" : "text-[#121840]"}`}>
                {p.theme}
              </h3>
              <p className={`text-sm leading-relaxed ${p.flagship ? "text-[#b45309]" : "text-[#5567a3]"}`}>
                {p.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
