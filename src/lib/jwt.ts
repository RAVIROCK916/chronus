import { jwtVerify } from "jose";

const secretKey = process.env.SESSION_SECRET!;
const secret = new TextEncoder().encode(secretKey);

export async function decryptSession(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as { userId: string; sessionId: string };
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}
