"use client"

import { useAuthStore } from "@/store/auth"
import { Button } from "@/components/ui/Button"
import { RoleBadge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { useState } from "react"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const { user, logout } = useAuthStore()
  const router = useRouter()
  const [saved, setSaved] = useState(false)

  function handleLogout() {
    logout()
    router.push("/")
  }

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (!user) return null

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-neutral-900 mb-8">Settings</h1>

      <div className="flex flex-col gap-5">
        {/* Profile */}
        <div className="bg-white rounded-2xl border border-black/6 p-6">
          <h2 className="text-sm font-semibold text-neutral-700 mb-5">Profile</h2>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-violet-500 flex items-center justify-center text-white text-2xl font-bold">
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-neutral-900">{user.name}</h3>
              <p className="text-sm text-neutral-500">{user.email}</p>
              <div className="mt-1.5">
                <RoleBadge role={user.role} />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Input label="Full Name" defaultValue={user.name} />
            <Input label="Email" defaultValue={user.email} disabled hint="Contact admin to change email" />
            <Input label="Location" placeholder="e.g., Bengaluru" />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-neutral-700">Bio</label>
              <textarea
                defaultValue={user.bio || ""}
                rows={3}
                placeholder="Tell the community about yourself..."
                className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-900 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 resize-none"
              />
            </div>
          </div>
          <Button variant="primary" size="md" className="mt-5" onClick={handleSave}>
            {saved ? "Saved ✓" : "Save Changes"}
          </Button>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl border border-black/6 p-6">
          <h2 className="text-sm font-semibold text-neutral-700 mb-4">Notifications</h2>
          <div className="flex flex-col gap-3">
            {[
              { label: "Event reminders", description: "Get reminded 24h before events you've RSVP'd" },
              { label: "Community updates", description: "New articles and announcements" },
              { label: "Newsletter", description: "Monthly Design Hub India newsletter" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-neutral-800">{item.label}</p>
                  <p className="text-xs text-neutral-400">{item.description}</p>
                </div>
                <button className="relative w-10 h-5 rounded-full bg-orange-500 transition-colors">
                  <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Danger zone */}
        <div className="bg-white rounded-2xl border border-red-100 p-6">
          <h2 className="text-sm font-semibold text-red-600 mb-4">Account</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-800">Sign out</p>
              <p className="text-xs text-neutral-400">Sign out from this device</p>
            </div>
            <Button variant="outline" size="sm" icon={<LogOut size={14} />} onClick={handleLogout}>
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
