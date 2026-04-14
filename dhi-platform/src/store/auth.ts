import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User, UserRole } from "@/lib/types"

interface AuthStore {
  user: User | null
  isLoading: boolean
  login: (email: string) => Promise<void>
  verifyOtp: (email: string, otp: string) => Promise<void>
  logout: () => void
  setUser: (user: User) => void
}

// Mock users for development
const MOCK_USERS: Record<string, User> = {
  "lead@designhubindia.com": {
    id: "1",
    email: "lead@designhubindia.com",
    name: "Aakash Sharma",
    role: "hub_lead",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=aakash",
    joinedAt: "2024-01-01",
    bio: "Hub Lead @ Design Hub India | SAP",
  },
  "core@designhubindia.com": {
    id: "2",
    email: "core@designhubindia.com",
    name: "Priya Nair",
    role: "core_member",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=priya",
    joinedAt: "2024-02-15",
    bio: "Core Member | UX Designer",
  },
  "member@designhubindia.com": {
    id: "3",
    email: "member@designhubindia.com",
    name: "Rahul Mehta",
    role: "member",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=rahul",
    joinedAt: "2024-03-10",
  },
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      login: async (email: string) => {
        set({ isLoading: true })
        // Simulate OTP send
        await new Promise((r) => setTimeout(r, 1000))
        set({ isLoading: false })
      },
      verifyOtp: async (email: string, otp: string) => {
        set({ isLoading: true })
        await new Promise((r) => setTimeout(r, 1000))
        // Mock: any 6-digit OTP works
        if (otp.length === 6) {
          const user = MOCK_USERS[email] || {
            id: Date.now().toString(),
            email,
            name: email.split("@")[0],
            role: "member" as UserRole,
            joinedAt: new Date().toISOString(),
          }
          set({ user, isLoading: false })
        } else {
          set({ isLoading: false })
          throw new Error("Invalid OTP")
        }
      },
      logout: () => set({ user: null }),
      setUser: (user: User) => set({ user }),
    }),
    {
      name: "dhi-auth",
      partialize: (state) => ({ user: state.user }),
    }
  )
)
