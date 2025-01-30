import db from "@/db";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export const resolvers = {
  Query: {
    hello: () => "Hello world!",
    users: getUsers,
  },
  Mutation: {
    createUser,
    updateNameOfUser,
  },
};

/* Resolvers */

/* Query */

async function getUsers() {
  const users = await db.select().from(userTable);
  return users;
}

/* Mutation */

async function createUser(
  _: any,
  { email, password }: { email: string; password: string },
) {
  const name = "User" + Math.random().toString().substring(2, 8);
  const password_hash = await bcrypt.hash(password, 10);
  const user = await db
    .insert(userTable)
    .values({ name, email, password_hash })
    .returning();
  console.log({ user });
  return user[0];
}

async function updateNameOfUser(
  _: any,
  { id, name }: { id: string; name: string },
) {
  const user = await db
    .update(userTable)
    .set({ name })
    .where(eq(userTable.id, id))
    .returning();
  return user[0];
}
