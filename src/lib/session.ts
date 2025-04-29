"use server";

import db from "@/db";
import { sessionTable } from "@/db/schema";
import { eq } from "drizzle-orm";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET as string;
const secret = new TextEncoder().encode(secretKey);

export async function createSession(userId: string) {
  console.log("Creating session for user:", userId);
  const expiresAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

  // 1. Create a session in the database
  const data = await db
    .insert(sessionTable)
    .values({
      user_id: userId,
      expires_at: expiresAt,
    })
    .returning({ id: sessionTable.id });

  const sessionId = data[0].id;
  console.log("Session created with ID:", sessionId);

  // 2. Encrypt the session ID
  const encryptedSessionId = await encryptSession({ userId, sessionId });
  console.log("Session encrypted successfully");

  // 3. Store the encrypted session ID in a cookie
  const cookie = cookies();
  cookie.set("sessionId", encryptedSessionId, {
    httpOnly: true,
    expires: expiresAt,
  });
  console.log("Session cookie set successfully");

  return sessionId;
}

export async function encryptSession(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(secret);
}

export async function decryptSession(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.error("Failed to verify session:", error);
    return null;
  }
}

export async function deleteSession(sessionId: string) {
  await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
  const cookie = cookies();
  cookie.delete("sessionId");
}
