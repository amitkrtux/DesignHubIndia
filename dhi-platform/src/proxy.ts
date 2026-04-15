import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const SESSION_COOKIE = "dhi_session"

async function getSession(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value
  if (!token) return null
  try {
    const secret = process.env.JWT_SECRET
    if (!secret) return null
    const encodedKey = new TextEncoder().encode(secret)
    const { payload } = await jwtVerify(token, encodedKey, { algorithms: ["HS256"] })
    return payload
  } catch {
    return null
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/dashboard")) {
    const session = await getSession(request)
    if (!session) {
      return NextResponse.redirect(new URL("/auth", request.url))
    }
  }

  if (pathname.startsWith("/auth")) {
    const session = await getSession(request)
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth"],
}
