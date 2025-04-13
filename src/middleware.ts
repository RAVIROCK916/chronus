import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { publicRoutes } from "./constants";
import { decryptSession } from "./lib/jwt";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Skip auth check for public routes and API routes
  if (publicRoutes.includes(path)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("sessionId")?.value;

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", path);
    return NextResponse.redirect(loginUrl);
  }

  // Check if token is valid
  const { userId, sessionId } = (await decryptSession(token)) as {
    userId: string;
    sessionId: string;
  };

  if (!userId || !sessionId) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|fonts/|favicon.ico).*)"],
};
