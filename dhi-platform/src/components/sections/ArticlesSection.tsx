"use client"

import { motion } from "framer-motion"
import { ArrowRight, Clock, FileText, Rss } from "lucide-react"
import Link from "next/link"
import { formatDate } from "@/lib/utils"

const articles = [
  {
    id: "1",
    title: "The State of Design at SAP India — 2025 Annual Report",
    excerpt: "A comprehensive look at how design thinking transformed product development across SAP India. Highlights from 200+ designers.",
    author: "Design Hub India Team",
    publishedAt: "2025-12-01",
    type: "newsletter" as const,
    readTime: "8 min",
    bar: "bg-[#2563eb]",
  },
  {
    id: "2",
    title: "How We Ran 24 Design Events in 12 Months",
    excerpt: "Lessons from organising community events at scale — what worked, what didn't, and how we built something lasting.",
    author: "Priya Nair",
    publishedAt: "2025-11-15",
    type: "article" as const,
    readTime: "5 min",
    bar: "bg-[#7c3aed]",
  },
  {
    id: "3",
    title: "AI-Assisted Design: Our 3-Month Experiment with Claude",
    excerpt: "We used AI in our design workflow for 3 months. What we found about creativity, productivity, and what AI still can't do.",
    author: "Aakash Sharma",
    publishedAt: "2025-10-28",
    type: "article" as const,
    readTime: "6 min",
    bar: "bg-[#f43f5e]",
  },
  {
    id: "4",
    title: "Impulse India 2025 Recap: Echoes of Tomorrow",
    excerpt: "Four tracks, 8 global speakers, 200+ attendees — everything that happened at our biggest event of 2025.",
    author: "Design Hub India Team",
    publishedAt: "2025-09-01",
    type: "newsletter" as const,
    readTime: "4 min",
    bar: "bg-[#f59e0b]",
  },
]

export function ArticlesSection() {
  return (
    <section id="articles" data-theme="light" className="bg-[#f8faff] py-24 sm:py-28 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12 sm:mb-14"
        >
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#2563eb] mb-4">
              Articles & Newsletter
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#121840] leading-[1.15]">
              From the Community
            </h2>
          </div>
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#374375] hover:text-[#2563eb] transition-colors flex-shrink-0"
          >
            Read all <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {articles.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group bg-white rounded-2xl border border-[#e2e7f5] overflow-hidden hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/40 transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Color bar */}
              <div className={`h-1 w-full ${a.bar}`} />

              <div className="p-5 sm:p-6 flex flex-col gap-3 flex-1">
                {/* Meta */}
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-[#5567a3]">
                    {a.type === "newsletter" ? <Rss size={11} /> : <FileText size={11} />}
                    {a.type === "newsletter" ? "Newsletter" : "Article"}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[#5567a3]">
                    <Clock size={10} /> {a.readTime}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#121840] leading-snug line-clamp-2 group-hover:text-[#2563eb] transition-colors">
                  {a.title}
                </h3>
                <p className="text-xs text-[#374375] leading-relaxed line-clamp-3 flex-1">
                  {a.excerpt}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-[#e2e7f5]">
                  <div>
                    <p className="text-xs font-bold text-[#1e2856]">{a.author}</p>
                    <p className="text-xs text-[#5567a3] mt-0.5">{formatDate(a.publishedAt)}</p>
                  </div>
                  <ArrowRight size={13} className="text-[#8896c4] group-hover:text-[#2563eb] transition-colors flex-shrink-0" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
