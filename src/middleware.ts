import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { publicRoutes } from "./constants";
import { decryptToken } from "./lib/jwt";
import { verifySession } from "./lib/session";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const loginUrl = new URL("/login", request.url);
  const dashboardUrl = new URL("/dashboard", request.url);

  const token = request.cookies.get("sessionId")?.value;

  // Skip auth check for public routes and API routes
  if (publicRoutes.includes(path)) {
    if (!token) {
      return NextResponse.next();
    }

    const decryptedToken = await decryptToken(token);
    if (!decryptedToken?.userId || !decryptedToken.sessionId) {
      request.cookies.delete("sessionId");
      return NextResponse.next();
    }
    // try {
    //   await verifySession();
    // } catch (error) {
    //   request.cookies.delete("sessionId");
    //   return NextResponse.redirect(loginUrl);
    // }

    return NextResponse.redirect(dashboardUrl);
  }

  if (!token) {
    loginUrl.searchParams.set("from", path);
    return NextResponse.redirect(loginUrl);
  }

  // Check if token is valid
  const decryptedToken = await decryptToken(token);

  if (!decryptedToken?.userId || !decryptedToken.sessionId) {
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|fonts/|favicon.ico).*)"],
};
