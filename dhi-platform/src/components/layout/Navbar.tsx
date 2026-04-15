"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/store/auth"
import { DHIWordmark } from "@/components/ui/Logo"

const navLinks = [
  { label: "About",       href: "/#about" },
  { label: "Initiatives", href: "/#initiatives" },
  { label: "Events",      href: "/#events" },
  { label: "Impulse",     href: "/#impulse" },
  { label: "Plans",       href: "/#plans" },
]

export function Navbar() {
  // true = navbar is over a dark section → white text
  // false = navbar is over a light section → dark text
  const [darkBg, setDarkBg]         = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { user } = useAuthStore()

  useEffect(() => {
    const update = () => {
      // Sample the element sitting just below the navbar bottom edge
      const el = document.elementFromPoint(window.innerWidth / 2, 65)
      const section = el?.closest("[data-theme]")
      setDarkBg(section?.getAttribute("data-theme") !== "light")
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update, { passive: true })
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [pathname])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  if (pathname.startsWith("/dashboard")) return null

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          darkBg
            ? "bg-[#060b1e] border-b border-white/10"
            : "bg-white shadow-sm shadow-black/5 border-b border-[#e2e7f5]"
        )}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 gap-4">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <DHIWordmark bg={darkBg ? "dark" : "light"} size="md" />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150",
                    darkBg
                      ? "text-white font-semibold hover:text-white hover:bg-white/10"
                      : "text-[#2d3a6b] hover:text-[#121840] hover:bg-[#f0f3ff]"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA area */}
            <div className="hidden md:flex items-center gap-2 flex-shrink-0">
              {user ? (
                <Link
                  href="/dashboard"
                  className="inline-flex items-center px-5 py-2 text-sm font-bold rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white transition-colors"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/auth"
                    className={cn(
                      "px-4 py-2 text-sm font-semibold rounded-xl transition-colors",
                      darkBg
                        ? "text-white font-semibold hover:text-white hover:bg-white/10"
                        : "text-[#2d3a6b] hover:text-[#121840] hover:bg-[#f0f3ff]"
                    )}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/auth"
                    className="inline-flex items-center px-5 py-2 text-sm font-bold rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white transition-colors"
                  >
                    Join Community
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className={cn(
                "md:hidden flex items-center justify-center w-10 h-10 rounded-xl transition-colors",
                darkBg
                  ? "text-white hover:bg-white/10"
                  : "text-[#2d3a6b] hover:bg-[#f0f3ff]"
              )}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{ opacity: 0, y: -8,    scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="fixed top-[68px] left-4 right-4 z-40 bg-white rounded-2xl border border-[#e2e7f5] shadow-2xl shadow-blue-900/10 overflow-hidden md:hidden"
          >
            <nav className="flex flex-col p-3 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 rounded-xl text-sm font-semibold text-[#2d3a6b] hover:bg-[#f0f3ff] hover:text-[#2563eb] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="px-3 pb-3 flex flex-col gap-2">
              {user ? (
                <Link href="/dashboard" className="flex items-center justify-center py-3 text-sm font-bold rounded-xl bg-[#2563eb] text-white">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/auth" className="flex items-center justify-center py-3 text-sm font-semibold rounded-xl border border-[#e2e7f5] text-[#2563eb]">
                    Sign in
                  </Link>
                  <Link href="/auth" className="flex items-center justify-center py-3 text-sm font-bold rounded-xl bg-[#2563eb] text-white">
                    Join Community
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
