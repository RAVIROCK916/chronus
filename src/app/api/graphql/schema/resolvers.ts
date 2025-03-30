import db from "@/db";
import { projectTable, sessionTable, taskTable, userTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { decryptSession } from "@/lib/session";
import { JWTPayload } from "jose";
import { ContextType } from "@/types/graphql";
import { Task, TaskPriority, TaskStatus } from "@/types";

export const resolvers = {
  Query: {
    hello: () => "Hello world!",
    users: getUsers,
    projects: getProjects,
    tasks: getTasks,
    task: getTask,
  },
  Mutation: {
    createUser,
    loginUser,
    updateNameOfUser,
    verifySession,
    createProject,
    deleteProject,
    addTask,
    updateTask,
  },
  Task: {
    project: getProjectOfTask,
  },
};

/* Resolvers */

/* Query */

async function getUsers() {
  const users = await db.select().from(userTable);
  return users;
}

async function getProjects(_: any, __: any, context: ContextType) {
  const projects = await db
    .select()
    .from(projectTable)
    .where(eq(projectTable.user_id, context.userId));
  return projects;
}

async function getTasks(
  _: any,
  { projectId }: { projectId: string },
  context: ContextType,
) {
  if (!context.userId) {
    throw new Error("You are not authorized to view tasks");
  }

  const tasks = await db
    .select()
    .from(taskTable)
    .where(
      and(
        eq(taskTable.project_id, projectId),
        eq(taskTable.user_id, context.userId),
      ),
    );
  return tasks;
}

async function getTask(_: any, { id }: { id: string }, context: ContextType) {
  const task = await db
    .select()
    .from(taskTable)
    .where(and(eq(taskTable.id, id), eq(taskTable.user_id, context.userId)));
  return task[0];
}

async function getProjectOfTask(parent: Task) {
  const project = await db
    .select()
    .from(projectTable)
    .where(eq(projectTable.id, parent.project_id));
  return project[0];
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
    // const isPasswordCorrect = await bcrypt.compare(password, password_hash);
    // if (isPasswordCorrect) {
    return user[0];
    // }
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

async function verifySession(_: any, __: any, context: ContextType) {
  const userId = context.userId;
  const sessionId = context.sessionId;
  console.log("verifying session", context);
  try {
    if (!sessionId) {
      throw new Error("No session ID found");
    }

    const session = await db
      .select()
      .from(sessionTable)
      .where(
        and(
          eq(sessionTable.user_id, userId as string),
          eq(sessionTable.id, sessionId as string),
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

/* Projects */

async function createProject(
  _: any,
  { name, description }: { name: string; description: string },
  context: ContextType,
) {
  const project = await db
    .insert(projectTable)
    .values({ user_id: context.userId, name, description })
    .returning();
  return project[0];
}

async function deleteProject(_: any, { id }: { id: string }) {
  const project = await db
    .delete(projectTable)
    .where(eq(projectTable.id, id))
    .returning();
  return project[0];
}

/* Tasks */

async function addTask(
  _: any,
  {
    title,
    description,
    status,
    projectId,
  }: {
    title: string;
    description?: string;
    status: TaskStatus;
    projectId: string;
  },
  context: ContextType,
) {
  const userId = context.userId;
  if (!userId) {
    throw new Error("You are not authorized to create a task");
  }
  const task = await db
    .insert(taskTable)
    .values({
      title,
      description,
      status,
      user_id: userId,
      project_id: projectId,
    })
    .returning();
  return task[0];
}

async function updateTask(
  _: any,
  updatedTask: {
    id: string;
    title?: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    labels?: string[];
  },
) {
  const { id, title, description, status, priority, labels } = updatedTask;
  const task = await db
    .update(taskTable)
    .set({ title, description, status, priority, labels })
    .where(eq(taskTable.id, id))
    .returning();
  return task[0];
}
