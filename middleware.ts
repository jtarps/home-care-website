import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()

    if (error) {
      console.error("Middleware auth error:", error)
    }

    const isLoginPage = req.nextUrl.pathname === "/caregiver/login"
    const isCaregiverRoute = req.nextUrl.pathname.startsWith("/caregiver") && !isLoginPage
    const isCheckInRoute = req.nextUrl.pathname.startsWith("/checkin")

    // Protect caregiver and checkin routes
    if ((isCaregiverRoute || isCheckInRoute) && !session) {
      console.log("No session, redirecting to login")
      return NextResponse.redirect(new URL("/caregiver/login", req.url))
    }

    // Redirect authenticated users away from login
    if (isLoginPage && session) {
      console.log("Session exists, redirecting to dashboard")
      return NextResponse.redirect(new URL("/caregiver/dashboard", req.url))
    }

    return res
  } catch (error) {
    console.error("Middleware error:", error)
    return res
  }
}

export const config = {
  matcher: ["/caregiver/:path*", "/checkin/:path*"],
}
