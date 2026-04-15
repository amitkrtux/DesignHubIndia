"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, ArrowRight, ArrowLeft, Sparkles, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { useAuthStore } from "@/store/auth"
import { useRouter } from "next/navigation"
import { DHIWordmark } from "@/components/ui/Logo"

type Step = "email" | "otp"

export default function AuthPage() {
  const [step, setStep] = useState<Step>("email")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const { login, verifyOtp, isLoading } = useAuthStore()
  const router = useRouter()

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    if (!email.trim()) return
    try {
      await login(email.trim())
      setStep("otp")
    } catch {
      setError("Failed to send OTP. Please try again.")
    }
  }

  async function handleOtpSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    try {
      await verifyOtp(email.trim(), otp.trim())
      router.push("/dashboard")
    } catch {
      setError("Invalid OTP. Please try again.")
    }
  }

  const slide = {
    initial: { opacity: 0, x: 24 },
    animate: { opacity: 1, x: 0 },
    exit:    { opacity: 0, x: -24 },
  }

  return (
    <div className="min-h-[100dvh] bg-[#f8faff] flex items-center justify-center p-4">

      {/* Subtle glow */}
      <div className="pointer-events-none fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#2563eb]/8 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative z-10 w-full max-w-sm"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <DHIWordmark bg="light" size="lg" />
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-[#e2e7f5] shadow-xl shadow-blue-900/5 p-7 sm:p-8">
          <AnimatePresence mode="wait">
            {step === "email" ? (
              <motion.div key="email" variants={slide} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.22 }}>
                <div className="w-11 h-11 rounded-xl bg-[#eff6ff] border border-[#bfdbfe] flex items-center justify-center mb-5">
                  <Mail size={20} className="text-[#2563eb]" />
                </div>
                <h1 className="text-2xl font-bold text-[#121840] mb-1">Welcome back</h1>
                <p className="text-sm text-[#5567a3] mb-6">
                  Sign in or create your Design Hub India account.
                </p>

                <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
                  <Input
                    label="Work Email"
                    type="email"
                    placeholder="you@sap.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={<Mail size={15} />}
                    error={error}
                    required
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={isLoading}
                    icon={<ArrowRight size={16} />}
                    iconPosition="right"
                    className="w-full"
                  >
                    Continue with Email
                  </Button>
                </form>

                <div className="mt-5 p-3 bg-[#f8faff] rounded-xl border border-[#e2e7f5]">
                  <p className="text-xs text-[#8896c4] text-center">
                    Use your <strong className="text-[#5567a3]">@sap.com</strong> work email to receive a sign-in code
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div key="otp" variants={slide} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.22 }}>
                <div className="w-11 h-11 rounded-xl bg-[#f5f3ff] border border-[#ddd6fe] flex items-center justify-center mb-5">
                  <ShieldCheck size={20} className="text-[#7c3aed]" />
                </div>
                <h1 className="text-2xl font-bold text-[#121840] mb-1">Check your email</h1>
                <p className="text-sm text-[#5567a3] mb-1">We sent a 6-digit code to</p>
                <p className="text-sm font-semibold text-[#1e2856] mb-6">{email}</p>

                <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4">
                  <Input
                    label="One-Time Password"
                    type="text"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                    icon={<Sparkles size={15} />}
                    error={error}
                    maxLength={6}
                    required
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={isLoading}
                    icon={<ArrowRight size={16} />}
                    iconPosition="right"
                    className="w-full"
                  >
                    Verify & Sign In
                  </Button>
                </form>

                <button
                  onClick={() => { setStep("email"); setError(""); setOtp("") }}
                  className="flex items-center gap-2 text-sm text-[#8896c4] hover:text-[#2563eb] transition-colors mt-4"
                >
                  <ArrowLeft size={13} /> Change email
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="text-center text-xs text-[#8896c4] mt-5">
          By signing in, you agree to our Terms & Privacy Policy.
        </p>
      </motion.div>
    </div>
  )
}
