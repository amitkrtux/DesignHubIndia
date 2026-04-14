"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import React from "react"

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glass?: boolean
  onClick?: () => void
  padding?: "none" | "sm" | "md" | "lg"
}

export function Card({
  children,
  className,
  hover = false,
  glass = false,
  onClick,
  padding = "md",
}: CardProps) {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-5 sm:p-6",
    lg: "p-6 sm:p-8",
  }

  const base = cn(
    "rounded-2xl border border-[#e2e7f5] bg-white",
    paddings[padding],
    hover && "transition-all duration-300 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/50 cursor-pointer",
    glass && "glass",
    className
  )

  if (hover || onClick) {
    return (
      <motion.div
        className={base}
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        onClick={onClick}
      >
        {children}
      </motion.div>
    )
  }

  return <div className={base}>{children}</div>
}

// Stat card
interface StatCardProps {
  label: string
  value: string | number
  icon?: React.ReactNode
  trend?: { value: number; positive: boolean }
  className?: string
}

export function StatCard({ label, value, icon, trend, className }: StatCardProps) {
  return (
    <Card className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-[#5567a3] font-medium">{label}</span>
        {icon && (
          <div className="w-9 h-9 rounded-xl bg-[#eff6ff] flex items-center justify-center text-[#2563eb]">
            {icon}
          </div>
        )}
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl sm:text-3xl font-bold text-[#121840] tracking-tight">
          {value}
        </span>
        {trend && (
          <span className={cn("text-sm font-semibold mb-1", trend.positive ? "text-emerald-600" : "text-[#f43f5e]")}>
            {trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}%
          </span>
        )}
      </div>
    </Card>
  )
}
