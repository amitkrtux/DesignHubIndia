"use client"

import Link from "next/link"
import { DHIWordmark } from "@/components/ui/Logo"
import { Mail, ExternalLink } from "lucide-react"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#080d25] text-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-10">

        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand col */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block mb-5">
              <DHIWordmark bg="dark" size="md" />
            </Link>
            <p className="text-sm text-white/45 leading-relaxed max-w-xs mb-6">
              Design Hub India — the global SAP design community hub representing
              India. Connecting designers across 9 hubs worldwide.
            </p>
            <div className="flex items-center gap-2">
              {[
                { label: "LinkedIn",  icon: <ExternalLink size={14} />, href: "#" },
                { label: "Email",     icon: <Mail         size={14} />, href: "#" },
                { label: "Community", icon: <ExternalLink size={14} />, href: "#" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl bg-white/6 hover:bg-white/12 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-5">
              Platform
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "About",       href: "/#about" },
                { label: "Initiatives", href: "/#initiatives" },
                { label: "Events",      href: "/#events" },
                { label: "Impulse",     href: "/#impulse" },
                { label: "Join",        href: "/auth" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-white/45 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-5">
              Community
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Member Dashboard",  href: "/dashboard" },
                { label: "AI Content Studio", href: "/dashboard/content" },
                { label: "Events Portal",     href: "/dashboard/events" },
                { label: "Newsletter",        href: "/#articles" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-white/45 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider + bottom */}
        <div className="border-t border-white/6 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            © {year} Design Hub India · Part of the global SAP Design Community
          </p>
          <div className="flex items-center gap-5">
            {["Privacy", "Terms", "Contact"].map((t) => (
              <a key={t} href="#" className="text-xs text-white/25 hover:text-white/60 transition-colors">
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
