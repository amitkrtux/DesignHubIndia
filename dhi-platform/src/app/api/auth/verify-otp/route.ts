import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import {
  verifyToken,
  hashOtp,
  signSessionToken,
  resolveRole,
  resolveName,
  OTP_COOKIE,
  SESSION_COOKIE,
  SESSION_COOKIE_OPTIONS,
} from "@/lib/auth-server"

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json()

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 })
    }

    const cookieStore = await cookies()
    const otpToken = cookieStore.get(OTP_COOKIE)?.value

    if (!otpToken) {
      return NextResponse.json(
        { error: "Sign-in code expired. Please request a new one." },
        { status: 401 }
      )
    }

    const payload = await verifyToken(otpToken)

    if (!payload) {
      return NextResponse.json(
        { error: "Sign-in code expired. Please request a new one." },
        { status: 401 }
      )
    }

    if ((payload.email as string).toLowerCase() !== email.trim().toLowerCase()) {
      return NextResponse.json({ error: "Invalid request." }, { status: 401 })
    }

    const submittedHash = await hashOtp(otp.trim())
    if (submittedHash !== payload.otpHash) {
      return NextResponse.json(
        { error: "Invalid code. Please try again." },
        { status: 401 }
      )
    }

    const normalizedEmail = email.trim().toLowerCase()
    const role = resolveRole(normalizedEmail)
    const name = resolveName(normalizedEmail)

    const user = {
      id: Buffer.from(normalizedEmail).toString("base64"),
      email: normalizedEmail,
      name,
      role,
      joinedAt: new Date().toISOString(),
      avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(normalizedEmail)}`,
    }

    const sessionToken = await signSessionToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    })

    cookieStore.delete(OTP_COOKIE)
    cookieStore.set(SESSION_COOKIE, sessionToken, SESSION_COOKIE_OPTIONS)

    return NextResponse.json({ user })
  } catch (err) {
    console.error("[verify-otp]", err)
    return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 500 })
  }
}
