import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

import { typeDefs } from "./schema/type-defs";
import { resolvers } from "./schema/resolvers";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { decryptSession } from "@/lib/session";

const server = new ApolloServer({ typeDefs, resolvers });

const handler = startServerAndCreateNextHandler(server, {
  context: async (req: NextRequest) => {
    const token = cookies().get("sessionId")?.value || "";
    // if there is no token, return an empty object
    if (!token) return {};

    const decryptedToken = await decryptSession(token);
    return { userId: decryptedToken?.userId };
  },
});

console.log("apollo server started");

export { handler as GET, handler as POST };
