import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { publicRoutes } from "./constants";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Skip auth check for public routes and API routes
  if (publicRoutes.includes(path)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("sessionId");

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", path);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|fonts/|favicon.ico).*)"],
};
