"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  icon?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-semibold text-[#2d3a6b]">{label}</label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8896c4]">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full h-11 px-3 rounded-xl border border-[#e2e7f5] bg-white text-[#121840] text-sm",
              "placeholder:text-[#c4cde8]",
              "transition-all duration-150",
              "focus:outline-none focus:ring-2 focus:ring-[#2563eb]/15 focus:border-[#2563eb]",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#f8faff]",
              icon && "pl-10",
              error && "border-[#f43f5e] focus:ring-[#f43f5e]/15 focus:border-[#f43f5e]",
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-[#f43f5e]">{error}</p>}
        {hint && !error && <p className="text-xs text-[#8896c4]">{hint}</p>}
      </div>
    )
  }
)
Input.displayName = "Input"

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-semibold text-[#2d3a6b]">{label}</label>
        )}
        <textarea
          ref={ref}
          className={cn(
            "w-full px-3 py-2.5 rounded-xl border border-[#e2e7f5] bg-white text-[#121840] text-sm",
            "placeholder:text-[#c4cde8] resize-y min-h-[96px]",
            "transition-all duration-150",
            "focus:outline-none focus:ring-2 focus:ring-[#2563eb]/15 focus:border-[#2563eb]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-[#f43f5e] focus:ring-[#f43f5e]/15",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-[#f43f5e]">{error}</p>}
        {hint && !error && <p className="text-xs text-[#8896c4]">{hint}</p>}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-semibold text-[#2d3a6b]">{label}</label>
        )}
        <select
          ref={ref}
          className={cn(
            "w-full h-11 px-3 rounded-xl border border-[#e2e7f5] bg-white text-[#121840] text-sm",
            "transition-all duration-150 cursor-pointer",
            "focus:outline-none focus:ring-2 focus:ring-[#2563eb]/15 focus:border-[#2563eb]",
            error && "border-[#f43f5e]",
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-[#f43f5e]">{error}</p>}
      </div>
    )
  }
)
Select.displayName = "Select"
