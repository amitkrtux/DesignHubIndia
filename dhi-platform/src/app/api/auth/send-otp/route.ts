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
  try {
    const { email } = await request.json()

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    if (!isAllowedEmail(email.trim())) {
      return NextResponse.json(
        { error: "Only @sap.com email addresses are allowed to sign in" },
        { status: 400 }
      )
    }

    const otp = generateOtp()
    const otpHash = await hashOtp(otp)
    const token = await signOtpToken({ email: email.trim().toLowerCase(), otpHash })

    await sendOtpEmail(email.trim(), otp)

    const cookieStore = await cookies()
    cookieStore.set(OTP_COOKIE, token, OTP_COOKIE_OPTIONS)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[send-otp]", err)
    return NextResponse.json(
      { error: "Failed to send sign-in code. Please try again." },
      { status: 500 }
    )
  }
}
