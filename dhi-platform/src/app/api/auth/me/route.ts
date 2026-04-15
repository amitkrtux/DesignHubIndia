import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { verifyToken, SESSION_COOKIE } from "@/lib/auth-server"
import type { UserRole } from "@/lib/types"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(SESSION_COOKIE)?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const payload = await verifyToken(token)

    if (!payload) {
      return NextResponse.json({ error: "Session expired" }, { status: 401 })
    }

    const user = {
      id: payload.id as string,
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as UserRole,
      joinedAt: new Date().toISOString(),
      avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(payload.email as string)}`,
    }

    return NextResponse.json({ user })
  } catch (err) {
    console.error("[auth/me]", err)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }
}
