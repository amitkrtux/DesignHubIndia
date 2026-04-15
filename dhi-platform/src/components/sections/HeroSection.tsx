"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const stagger = { animate: { transition: { staggerChildren: 0.11 } } }
const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 0.61, 0.36, 1] as const } },
}

export function HeroSection() {
  return (
    <section data-theme="dark" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#080d25]">

      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-[10%] w-[480px] h-[480px] rounded-full bg-[#2563eb]/12 blur-[120px]" />
        <div className="absolute top-[30%] right-[5%] w-[320px] h-[320px] rounded-full bg-[#7c3aed]/10 blur-[100px]" />
        <div className="absolute bottom-[10%] left-[35%] w-[360px] h-[240px] rounded-full bg-[#f43f5e]/6 blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center pt-32 pb-24">
        <motion.div variants={stagger} initial="initial" animate="animate" className="flex flex-col items-center gap-6">

          {/* Eyebrow */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-blue-400/20 bg-blue-500/10 text-[11px] font-semibold text-blue-300 uppercase tracking-[0.18em]">
              SAP Design Community · Global
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.0] text-white"
          >
            Beating Heart
            <br />
            <span className="gradient-text">of Global</span>
            <br />
            SAP Design
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-white/75 max-w-lg leading-relaxed font-light"
          >
            Design Hub India connects 200+ designers across 9 global hubs —
            learning, building, and defining the future of enterprise design.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
          >
            <Link
              href="/auth"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-semibold rounded-full transition-colors"
            >
              Join the Community <ArrowRight size={15} />
            </Link>
            <Link
              href="/#about"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/30 hover:border-white/60 text-white/85 hover:text-white text-sm font-medium rounded-full transition-all"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#080d25] to-transparent" />

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-[9px] uppercase tracking-[0.25em] text-white/45">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
        />
      </motion.div>
    </section>
  )
}
