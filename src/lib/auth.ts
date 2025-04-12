"use server";

import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import { redirect } from "next/navigation";
import { SERVER_URL } from "@/constants";
import privateAPI from "./axios";
import { decryptSession } from "./session";

const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export async function createSession(userId: string) {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret);

  cookies().set("sessionId", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return token;
}

export async function verifyAuth() {
  try {
    const token = cookies().get("sessionId")?.value;
    if (!token) return null;

    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export async function signOut() {
  await fetch(SERVER_URL, {
    method: "POST",
    body: JSON.stringify({
      query: `
					mutation {
						logoutUser
					}
				`,
    }),
    credentials: "include",
  })
    .then(() => cookies().delete("sessionId"))
    .then(() => redirect("/login"));
}
