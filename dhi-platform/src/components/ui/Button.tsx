"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger"
  size?: "sm" | "md" | "lg" | "xl"
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  iconPosition = "left",
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none whitespace-nowrap"

  const variants = {
    primary:   "bg-[#2563eb] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white shadow-sm hover:shadow-md",
    secondary: "bg-[#7c3aed] hover:bg-[#6d28d9] active:bg-[#5b21b6] text-white shadow-sm hover:shadow-md",
    ghost:     "hover:bg-[#eff6ff] active:bg-[#dbeafe] text-[#2563eb]",
    outline:   "border border-[#e2e7f5] hover:border-[#c4cde8] bg-white hover:bg-[#f8faff] text-[#1e2856] shadow-sm",
    danger:    "bg-[#f43f5e] hover:bg-[#e11d48] text-white shadow-sm",
  }

  const sizes = {
    sm: "h-8 px-3.5 text-xs rounded-lg",
    md: "h-10 px-4 text-sm",
    lg: "h-11 px-5 text-sm",
    xl: "h-13 px-7 text-base rounded-2xl",
  }

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...(props as object)}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : icon && iconPosition === "left" ? (
        icon
      ) : null}
      {children}
      {!loading && icon && iconPosition === "right" ? icon : null}
    </motion.button>
  )
}
