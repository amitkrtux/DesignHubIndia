import { create } from "zustand"
import type { User } from "@/lib/types"

interface AuthStore {
  user: User | null
  isLoading: boolean
  login: (email: string) => Promise<void>
  verifyOtp: (email: string, otp: string) => Promise<void>
  logout: () => Promise<void>
  initialize: () => Promise<void>
  setUser: (user: User) => void
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isLoading: false,

  login: async (email: string) => {
    set({ isLoading: true })
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to send sign-in code")
    } finally {
      set({ isLoading: false })
    }
  },

  verifyOtp: async (email: string, otp: string) => {
    set({ isLoading: true })
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Invalid code")
      set({ user: data.user })
    } finally {
      set({ isLoading: false })
    }
  },

  logout: async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    set({ user: null })
  },

  initialize: async () => {
    set({ isLoading: true })
    try {
      const res = await fetch("/api/auth/me")
      if (res.ok) {
        const data = await res.json()
        set({ user: data.user })
      } else {
        set({ user: null })
      }
    } catch {
      set({ user: null })
    } finally {
      set({ isLoading: false })
    }
  },

  setUser: (user: User) => set({ user }),
}))
