import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import {
  isAllowedEmail,
  generateOtp,
  hashOtp,
  signOtpToken,
  sendOtpEmail,
  OTP_COOKIE,
  OTP_COOKIE_OPTIONS,
} from "@/lib/auth-server"

export async function POST(request: Request) {
  const { email } = await request.json().catch(() => ({ email: null }))

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email is required" }, { status: 400 })
  }

  if (!isAllowedEmail(email.trim())) {
    return NextResponse.json(
      { error: "Only @sap.com email addresses are allowed to sign in" },
      { status: 400 }
    )
  }

  // Check env vars are present before doing anything
  if (!process.env.JWT_SECRET) {
    console.error("[send-otp] JWT_SECRET is not set")
    return NextResponse.json({ error: "Server configuration error: JWT_SECRET missing" }, { status: 500 })
  }
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error("[send-otp] Gmail credentials are not set")
    return NextResponse.json({ error: "Server configuration error: Gmail credentials missing" }, { status: 500 })
  }

  try {
    const otp = generateOtp()
    const otpHash = await hashOtp(otp)
    const token = await signOtpToken({ email: email.trim().toLowerCase(), otpHash })

    await sendOtpEmail(email.trim(), otp)

    const cookieStore = await cookies()
    cookieStore.set(OTP_COOKIE, token, OTP_COOKIE_OPTIONS)

    return NextResponse.json({ success: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error("[send-otp] error:", message)
    return NextResponse.json(
      { error: `Failed to send sign-in code: ${message}` },
      { status: 500 }
    )
  }
}
