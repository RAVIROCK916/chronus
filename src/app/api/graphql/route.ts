import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

import { typeDefs } from "./schema/type-defs";
import { resolvers } from "./schema/resolvers";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { decryptSession } from "@/lib/session";
import { JWTPayload } from "jose";
import { redirect } from "next/navigation";

const server = new ApolloServer({ typeDefs, resolvers });

interface SessionPayload extends JWTPayload {
  userId: string;
  sessionId: string;
}

const handler = startServerAndCreateNextHandler(server, {
  context: async (req: NextRequest) => {
    const token = cookies().get("sessionId")?.value;

    console.log("route token", token);
    // if there is no token, return an empty object
    if (!token) {
      console.log("no token");
      return {
        userId: "",
        sessionId: "",
      };
    }

    const decryptedToken = (await decryptSession(
      token,
    )) as SessionPayload | null;

    if (!decryptedToken) {
      console.log("decrypted token is null");
      // redirect("/login");
      return {
        userId: "",
        sessionId: "",
      };
    }

    return {
      userId: decryptedToken.userId,
      sessionId: decryptedToken.sessionId,
    };
  },
});

console.log("apollo server started");

export { handler as GET, handler as POST };
