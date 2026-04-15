import { SignJWT, jwtVerify } from "jose"
import nodemailer from "nodemailer"
import type { UserRole } from "@/lib/types"

// ─── Constants ────────────────────────────────────────────────────────────────

export const OTP_COOKIE = "dhi_otp_token"
export const SESSION_COOKIE = "dhi_session"

export const OTP_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 10, // 10 minutes
}

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 7 days
}

// ─── JWT ──────────────────────────────────────────────────────────────────────

function getEncodedKey() {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error("JWT_SECRET environment variable is not set")
  return new TextEncoder().encode(secret)
}

export async function signOtpToken(payload: { email: string; otpHash: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10m")
    .sign(getEncodedKey())
}

export async function signSessionToken(payload: {
  id: string
  email: string
  name: string
  role: UserRole
}) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getEncodedKey())
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getEncodedKey(), {
      algorithms: ["HS256"],
    })
    return payload
  } catch {
    return null
  }
}

// ─── OTP ──────────────────────────────────────────────────────────────────────

export function generateOtp(): string {
  const array = new Uint32Array(1)
  crypto.getRandomValues(array)
  return String(array[0] % 1_000_000).padStart(6, "0")
}

export async function hashOtp(otp: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(otp)
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer)
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

// ─── Email restriction ────────────────────────────────────────────────────────

const ALLOWED_SPECIAL = [
  "lead@designhubindia.com",
  "core@designhubindia.com",
  "sapdesignhubindia@gmail.com",
]

export function isAllowedEmail(email: string): boolean {
  const lower = email.toLowerCase()
  if (ALLOWED_SPECIAL.includes(lower)) return true
  return lower.endsWith("@sap.com")
}

// ─── Role & name resolution ───────────────────────────────────────────────────

export function resolveRole(email: string): UserRole {
  const lower = email.toLowerCase()
  if (lower === "lead@designhubindia.com") return "hub_lead"
  if (lower === "core@designhubindia.com") return "core_member"
  if (lower === "sapdesignhubindia@gmail.com") return "hub_lead"
  if (lower === "amit.tiwari03@sap.com") return "hub_lead"
  return "member"
}

export function resolveName(email: string): string {
  const known: Record<string, string> = {
    "lead@designhubindia.com": "Aakash Sharma",
    "core@designhubindia.com": "Priya Nair",
    "sapdesignhubindia@gmail.com": "Design Hub India",
    "amit.tiwari03@sap.com": "Amit Kumar Tiwari",
  }
  return known[email.toLowerCase()] ?? email.split("@")[0].replace(/\./g, " ")
}

// ─── Email ────────────────────────────────────────────────────────────────────

function createTransport() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })
}

export async function sendOtpEmail(to: string, otp: string): Promise<void> {
  const transport = createTransport()
  await transport.sendMail({
    from: `"Design Hub India" <${process.env.GMAIL_USER}>`,
    to,
    subject: "Your Design Hub India sign-in code",
    text: [
      `Your one-time sign-in code is: ${otp}`,
      "",
      "This code expires in 10 minutes.",
      "If you did not request this, you can safely ignore this email.",
      "",
      "— Design Hub India Team",
    ].join("\n"),
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; background: #f8faff; border-radius: 12px;">
        <img src="https://designhubindia.vercel.app/favicon.ico" alt="" width="32" style="margin-bottom: 16px;" />
        <h2 style="color: #121840; margin: 0 0 8px;">Sign in to Design Hub India</h2>
        <p style="color: #5567a3; margin: 0 0 24px;">Use the code below to complete your sign-in.</p>
        <div style="background: #fff; border: 1px solid #e2e7f5; border-radius: 8px; padding: 24px; text-align: center; margin-bottom: 24px;">
          <span style="font-size: 36px; font-weight: 700; letter-spacing: 0.25em; color: #121840;">${otp}</span>
        </div>
        <p style="color: #8896c4; font-size: 13px; margin: 0;">This code expires in <strong>10 minutes</strong>. If you did not request this, you can safely ignore this email.</p>
      </div>
    `,
  })
}
