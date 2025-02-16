"use server";

import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/login", "/signup", "/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = !publicRoutes.includes(path);

  if (isProtectedRoute) {
    const sessionCookie = req.cookies.get("sessionId");
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const response = await fetch(`${req.nextUrl.origin}/api/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation VerifySession($sessionId: String!) {
              verifySession(sessionId: $sessionId)
            }
          `,
          variables: {
            sessionId: sessionCookie.value,
          },
        }),
      });
      const data = await response.json();
      if (!data.data.verifySession) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    } catch (error) {
      console.error("Session verification failed:", error);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|fonts/|favicon|.*\\.png$).*)"],
};
