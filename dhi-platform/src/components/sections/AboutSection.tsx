"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const globalHubs = [
  { city: "Bengaluru",   flag: "🇮🇳", role: "India HQ",       active: true },
  { city: "Walldorf",    flag: "🇩🇪", role: "SAP Global HQ",  active: false },
  { city: "Palo Alto",   flag: "🇺🇸", role: "Americas",       active: false },
  { city: "Singapore",   flag: "🇸🇬", role: "APAC",           active: false },
  { city: "Prague",      flag: "🇨🇿", role: "Central Europe", active: false },
  { city: "São Paulo",   flag: "🇧🇷", role: "LAC",            active: false },
  { city: "Shanghai",    flag: "🇨🇳", role: "Greater China",  active: false },
  { city: "Sydney",      flag: "🇦🇺", role: "ANZ",            active: false },
  { city: "Nairobi",     flag: "🇰🇪", role: "MEA",            active: false },
]

export function AboutSection() {
  return (
    <section id="about" data-theme="light" className="bg-white py-24 sm:py-28 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#2563eb] mb-5">
              About
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#121840] leading-[1.15] mb-6">
              One community,<br />nine global hubs
            </h2>
            <p className="text-base text-[#374375] leading-relaxed mb-5">
              Design Hub India (DHI) is the India chapter of the global SAP Design
              Community — representing the entire nation within a worldwide network
              of 9 hubs. Founded in 2023, DHI is the voice of India&apos;s SAP
              designers on the global stage.
            </p>
            <p className="text-base text-[#374375] leading-relaxed mb-10">
              We run flagship events, workshops, mentorship programs, and a monthly
              newsletter — keeping 200+ SAP designers connected, inspired, and globally visible.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <Link
                href="/auth"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-semibold rounded-full transition-colors"
              >
                Join the Community <ArrowRight size={14} />
              </Link>
              <div>
                <p className="text-sm font-bold text-[#121840]">Amit Kumar Tiwari</p>
                <p className="text-xs text-[#5567a3] mt-0.5">Hub Lead, Design Hub India</p>
              </div>
            </div>
          </motion.div>

          {/* Right — hub grid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            <div className="rounded-2xl border border-[#e2e7f5] bg-[#f8faff] p-6 sm:p-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#5567a3] mb-5">
                Global Hub Network
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
                {globalHubs.map((hub, i) => (
                  <motion.div
                    key={hub.city}
                    initial={{ opacity: 0, x: 8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-white border transition-colors ${
                      hub.active
                        ? "border-[#2563eb]/25 shadow-sm shadow-blue-100"
                        : "border-[#e2e7f5] hover:border-[#c4cde8]"
                    }`}
                  >
                    <span className="text-lg leading-none flex-shrink-0">{hub.flag}</span>
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm font-semibold truncate ${hub.active ? "text-[#2563eb]" : "text-[#1e2856]"}`}>
                        {hub.city}
                      </p>
                      <p className="text-[11px] text-[#5567a3] truncate">{hub.role}</p>
                    </div>
                    {hub.active && (
                      <span className="flex-shrink-0 text-[9px] font-bold uppercase tracking-wide bg-[#eff6ff] text-[#2563eb] px-2 py-0.5 rounded-full">
                        India
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
