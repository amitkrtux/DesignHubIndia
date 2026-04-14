"use client"

import { cn } from "@/lib/utils"
import React from "react"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "brand" | "accent" | "success" | "warning" | "error" | "outline"
  size?: "sm" | "md"
  className?: string
}

export function Badge({ children, variant = "default", size = "sm", className }: BadgeProps) {
  const variants = {
    default: "bg-[#f0f3ff] text-[#3d4e85]",
    brand:   "bg-[#eff6ff] text-[#2563eb]",
    accent:  "bg-[#f5f3ff] text-[#7c3aed]",
    success: "bg-emerald-50 text-emerald-700",
    warning: "bg-[#fffbeb] text-[#d97706]",
    error:   "bg-[#fff1f2] text-[#e11d48]",
    outline: "border border-[#e2e7f5] text-[#5567a3] bg-transparent",
  }
  const sizes = {
    sm: "text-xs px-2.5 py-0.5",
    md: "text-sm px-3 py-1",
  }

  return (
    <span className={cn("inline-flex items-center gap-1 font-semibold rounded-full", variants[variant], sizes[size], className)}>
      {children}
    </span>
  )
}

export function RoleBadge({ role }: { role: string }) {
  const roleConfig: Record<string, { label: string; variant: BadgeProps["variant"] }> = {
    hub_lead:    { label: "Hub Lead",    variant: "brand" },
    core_member: { label: "Core Member", variant: "accent" },
    member:      { label: "Member",      variant: "default" },
    visitor:     { label: "Visitor",     variant: "outline" },
  }
  const config = roleConfig[role] || { label: role, variant: "default" as const }
  return <Badge variant={config.variant}>{config.label}</Badge>
}
