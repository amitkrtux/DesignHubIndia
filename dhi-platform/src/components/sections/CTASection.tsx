"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative bg-[#080d25] py-24 sm:py-28 lg:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-[#2563eb]/12 blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#60a5fa] mb-6">
            Get Involved
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
            Join Design Hub India
          </h2>
          <p className="text-base sm:text-lg text-white/40 max-w-md mx-auto mb-12 leading-relaxed">
            Connect with 200+ SAP designers across 9 global hubs. Attend exclusive events,
            grow your skills, and be part of something bigger.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-bold rounded-full transition-colors w-full sm:w-auto"
            >
              Join for Free <ArrowRight size={15} />
            </Link>
            <Link
              href="/#initiatives"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/12 hover:border-white/25 text-white/60 hover:text-white text-sm font-medium rounded-full transition-all w-full sm:w-auto"
            >
              Explore Platform
            </Link>
          </div>
          <p className="mt-6 text-xs text-white/20">
            SAP email required · Open to all SAP designers globally
          </p>
        </motion.div>
      </div>
    </section>
  )
}
