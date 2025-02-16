import db from "@/db";
import { projectTable, sessionTable, taskTable, userTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { decryptSession } from "@/lib/session";
import { JWTPayload } from "jose";

export const resolvers = {
  Query: {
    hello: () => "Hello world!",
    users: getUsers,
    projects: getProjects,
    tasks: getTasks,
  },
  Mutation: {
    createUser,
    loginUser,
    updateNameOfUser,
    verifySession,
    createProject,
  },
};

/* Resolvers */

/* Query */

async function getUsers() {
  const users = await db.select().from(userTable);
  return users;
}

async function getProjects(_: any, __: any, context: any) {
  const projects = await db
    .select()
    .from(projectTable)
    .where(eq(projectTable.user_id, context.userId));
  return projects;
}

async function getTasks() {
  const tasks = await db.select().from(taskTable);
  return tasks;
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
  return user[0];
}

async function loginUser(
  _: any,
  { email, password }: { email: string; password: string },
) {
  const user = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email));
  if (user[0]) {
    const password_hash = user[0].password_hash;
    const isPasswordCorrect = await bcrypt.compare(password, password_hash);
    if (isPasswordCorrect) {
      return user[0];
    }
  } else {
    return null;
  }
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

async function verifySession(_: any, { sessionId }: { sessionId: string }) {
  try {
    const decryptedSession: JWTPayload | null = await decryptSession(sessionId);
    const session = await db
      .select()
      .from(sessionTable)
      .where(
        and(
          eq(sessionTable.user_id, decryptedSession?.userId as string),
          eq(sessionTable.id, decryptedSession?.sessionId as string),
        ),
      );
    if (!session[0]) {
      throw new Error("Session not found");
    }
    return true;
  } catch (error) {
    console.error("verifying session failed", error);
    return false;
  }
}

async function createProject(
  _: any,
  { name, description }: { userId: string; name: string; description: string },
  context: any,
) {
  const project = await db
    .insert(projectTable)
    .values({ user_id: context.userId, name, description })
    .returning();
  console.info("project", project);
  return project[0];
}

// async function createTask(
//   _: any,
//   { name, description }: { name: string; description: string },
// ) {
//   const user = await db
//     .select()
//     .from(userTable)
//     .where(eq(userTable.id, sessionTable.user_id));
//   if (!user[0]) {
//     throw new Error("User not found");
//   }
//   const userId = user[0].id;
//   const task = await db
//     .insert(taskTable)
//     .values({ name, description, user_id: userId })
//     .returning();
//   return task[0];
// }
