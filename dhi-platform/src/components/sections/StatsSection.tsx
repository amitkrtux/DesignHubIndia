"use client"

import { motion } from "framer-motion"

const stats = [
  { value: "200+", label: "Designers" },
  { value: "9",    label: "Global Hubs" },
  { value: "2023", label: "Founded" },
  { value: "12+",  label: "Initiatives" },
]

export function StatsSection() {
  return (
    <section className="bg-[#080d25]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 border border-white/8 rounded-2xl overflow-hidden divide-x divide-white/8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex flex-col items-center justify-center py-10 px-4 text-center"
            >
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-none mb-2">
                {s.value}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-white/35 font-medium">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
