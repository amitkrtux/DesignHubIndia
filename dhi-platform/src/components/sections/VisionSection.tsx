"use client"

import { motion } from "framer-motion"

export function VisionSection() {
  return (
    <section className="bg-[#080d25] py-24 sm:py-28 lg:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#60a5fa] mb-8">
              Vision 2026
            </p>
            <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-light leading-snug text-white/85 mb-8">
              "To become the{" "}
              <span className="font-semibold text-white">
                heartbeat of SAP&apos;s global design culture
              </span>{" "}
              — where ideas are born, talent is nurtured, and design excellence is celebrated."
            </blockquote>
            <div className="h-px w-16 bg-blue-500/30" />
          </motion.div>

          {/* Pillars */}
          <div>
            {[
              {
                num: "01",
                title: "Inspire",
                body: "Curate and share design excellence globally. Run flagship events that set the benchmark for the industry.",
                color: "#60a5fa",
              },
              {
                num: "02",
                title: "Upskill",
                body: "Structured learning paths, cross-discipline workshops, and mentorship from senior SAP design practitioners.",
                color: "#a78bfa",
              },
              {
                num: "03",
                title: "Connect",
                body: "Build bridges across 9 global hubs, all SAP offices, and the broader design community worldwide.",
                color: "#fb7185",
              },
            ].map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.1 * i }}
                className="flex gap-5 py-6 border-b border-white/6 last:border-0 hover:bg-white/[0.02] rounded-xl px-4 -mx-4 transition-colors"
              >
                <span className="text-xs font-mono text-white/20 pt-0.5 w-6 flex-shrink-0">{item.num}</span>
                <div>
                  <h3 className="text-base font-bold mb-1.5" style={{ color: item.color }}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
