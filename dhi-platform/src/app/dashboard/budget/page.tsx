"use client"

import { motion } from "framer-motion"
import { StatCard } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { DollarSign, TrendingUp, TrendingDown, AlertCircle, Plus } from "lucide-react"
import { useAuthStore } from "@/store/auth"
import { hasAccess } from "@/lib/types"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const budgetItems = [
  { id: "1", title: "Design Sprint Q2 Venue", category: "Events", amount: 25000, type: "expense", status: "paid", date: "2025-04-10" },
  { id: "2", title: "Q2 Events Budget Allocation", category: "Events", amount: 80000, type: "allocation", status: "approved", date: "2025-04-01" },
  { id: "3", title: "Workshop Materials & Printing", category: "Materials", amount: 8500, type: "expense", status: "approved", date: "2025-04-12" },
  { id: "4", title: "Showcase AV Equipment Rental", category: "Events", amount: 15000, type: "expense", status: "pending", date: "2025-05-15" },
  { id: "5", title: "Speaker Gifts - Design Sprint", category: "Gifts", amount: 3500, type: "expense", status: "paid", date: "2025-04-20" },
  { id: "6", title: "Community Marketing Budget", category: "Marketing", amount: 30000, type: "allocation", status: "approved", date: "2025-01-01" },
]

const totalAllocated = budgetItems.filter(b => b.type === "allocation").reduce((s, b) => s + b.amount, 0)
const totalSpent = budgetItems.filter(b => b.type === "expense" && b.status !== "pending").reduce((s, b) => s + b.amount, 0)
const totalPending = budgetItems.filter(b => b.status === "pending").reduce((s, b) => s + b.amount, 0)

export default function BudgetPage() {
  const { user } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (user && !hasAccess(user.role, "hub_lead")) {
      router.push("/dashboard")
    }
  }, [user, router])

  if (!user || !hasAccess(user.role, "hub_lead")) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="w-16 h-16 rounded-3xl bg-red-50 flex items-center justify-center">
          <AlertCircle size={28} className="text-red-400" />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-bold text-neutral-900">Restricted Access</h2>
          <p className="text-sm text-neutral-500 mt-1">This section is only accessible to Hub Leads.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-neutral-900">Budget Dashboard</h1>
            <Badge variant="error" size="sm">Hub Lead Only</Badge>
          </div>
          <p className="text-sm text-neutral-500 mt-0.5">FY 2025 budget management</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-xl text-sm font-medium hover:bg-orange-600 transition-colors">
          <Plus size={14} /> Add Expense
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Budget" value={`₹${(totalAllocated / 1000).toFixed(0)}K`} icon={<DollarSign size={16} />} />
        <StatCard
          label="Spent"
          value={`₹${(totalSpent / 1000).toFixed(0)}K`}
          icon={<TrendingUp size={16} />}
          trend={{ value: Math.round((totalSpent / totalAllocated) * 100), positive: false }}
        />
        <StatCard label="Remaining" value={`₹${((totalAllocated - totalSpent) / 1000).toFixed(0)}K`} icon={<TrendingDown size={16} />} />
        <StatCard label="Pending" value={`₹${(totalPending / 1000).toFixed(0)}K`} icon={<AlertCircle size={16} />} />
      </div>

      {/* Budget utilization bar */}
      <div className="bg-white rounded-2xl border border-black/6 p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-neutral-700">Budget Utilization</h3>
          <span className="text-sm font-bold text-neutral-900">
            {Math.round((totalSpent / totalAllocated) * 100)}% used
          </span>
        </div>
        <div className="h-3 bg-neutral-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-orange-400 to-rose-500 transition-all duration-700"
            style={{ width: `${(totalSpent / totalAllocated) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-1.5 text-xs text-neutral-400">
          <span>₹0</span>
          <span>₹{(totalAllocated / 1000).toFixed(0)}K allocated</span>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-white rounded-2xl border border-black/6 overflow-hidden">
        <div className="px-5 py-4 border-b border-black/6 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-neutral-700">Transactions</h3>
          <Badge variant="default" size="sm">{budgetItems.length} entries</Badge>
        </div>
        <div className="divide-y divide-black/4">
          {budgetItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 px-5 py-3.5 hover:bg-neutral-50 transition-colors"
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                item.type === "allocation" ? "bg-emerald-50" : "bg-orange-50"
              }`}>
                {item.type === "allocation"
                  ? <TrendingUp size={14} className="text-emerald-500" />
                  : <TrendingDown size={14} className="text-orange-500" />
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-800 truncate">{item.title}</p>
                <p className="text-xs text-neutral-400">{item.category} · {new Date(item.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-sm font-bold ${item.type === "allocation" ? "text-emerald-600" : "text-orange-600"}`}>
                  {item.type === "allocation" ? "+" : "-"}₹{item.amount.toLocaleString("en-IN")}
                </p>
                <Badge
                  variant={item.status === "paid" ? "success" : item.status === "approved" ? "default" : "warning"}
                  size="sm"
                >
                  {item.status}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
