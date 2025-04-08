import db from "@/db";
import {
  eventTable,
  projectTable,
  sessionTable,
  taskTable,
  userTable,
} from "@/db/schema";
import { and, eq, inArray } from "drizzle-orm";
import bcrypt from "bcrypt";
import { decryptSession } from "@/lib/session";
import { JWTPayload } from "jose";
import { ContextType } from "@/types/graphql";
import { Project, Task, TaskPriority, TaskStatus } from "@/types";
import { redirect } from "next/navigation";

export const resolvers = {
  Query: {
    hello: () => "Hello world!",
    user: getCurrentUser,
    users: getUsers,
    projects: getProjects,
    project: getProject,
    tasks: getTasks,
    task: getTask,
    events: getEvents,
  },
  Mutation: {
    createUser,
    loginUser,
    updateUser,
    updateNameOfUser,
    verifySession,
    createProject,
    deleteProject,
    createTask,
    updateTask,
    deleteTask,
    deleteTasks,
    createEvent,
    updateEvent,
    deleteEvent,
  },
  Project: {
    user: getUserOfProject,
    tasks: getTasks,
  },
  Task: {
    project: getProjectOfTask,
  },
};

/* Resolvers */

/* Query */

async function getCurrentUser(_: any, __: any, context: ContextType) {
  if (!context.userId) {
    throw new Error("You are not authorized to get the current user");
  }
  const user = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, context.userId));
  return user[0];
}

async function getUsers() {
  const users = await db.select().from(userTable);
  return users;
}

async function getUserOfProject(parent: typeof projectTable.$inferSelect) {
  const user = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, parent.user_id));
  return user[0];
}

async function getProjects(_: any, __: any, context: ContextType) {
  const projects = await db
    .select()
    .from(projectTable)
    .where(eq(projectTable.user_id, context.userId));
  return projects;
}

async function getProject(
  _: any,
  { id }: { id: string },
  context: ContextType,
) {
  const project = await db
    .select()
    .from(projectTable)
    .where(
      and(eq(projectTable.id, id), eq(projectTable.user_id, context.userId)),
    );
  return project[0];
}

async function getTasks(
  parent: typeof projectTable.$inferSelect | undefined,
  { projectId }: { projectId: string },
  context: ContextType,
) {
  if (!context.userId) {
    throw new Error("You are not authorized to view tasks");
  }

  let id = projectId;

  if (parent) {
    id = parent.id;
  }

  const tasks = await db
    .select()
    .from(taskTable)
    .where(
      and(eq(taskTable.project_id, id), eq(taskTable.user_id, context.userId)),
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

async function getProjectOfTask(parent: typeof taskTable.$inferSelect) {
  const project = await db
    .select()
    .from(projectTable)
    .where(eq(projectTable.id, parent.project_id));
  return project[0];
}

async function getEvents(_: any, __: any, context: ContextType) {
  const events = await db
    .select()
    .from(eventTable)
    .where(eq(eventTable.user_id, context.userId));
  return events;
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

async function updateUser(
  _: any,
  user: {
    id: string;
    name: string;
    email: string;
    password_hash: string;
    profile_picture: string;
  },
) {
  const { id, name, email, password_hash, profile_picture } = user;
  const updatedUser = await db
    .update(userTable)
    .set({
      name,
      email,
      password_hash,
      profile_picture,
    })
    .where(eq(userTable.id, id))
    .returning();
  return updatedUser[0];
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
    const session = await db
      .select()
      .from(sessionTable)
      .where(
        and(eq(sessionTable.user_id, userId), eq(sessionTable.id, sessionId)),
      );
    if (!session[0]) {
      console.log("Session not found");
      return null;
    }

    const user = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, session[0].user_id));

    if (!user[0]) {
      console.log("User not found");
      return null;
    }

    return user[0];
  } catch (error) {
    console.error("verifying session failed", error);
    return null;
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

async function createTask(
  _: any,
  task: {
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    labels: string[];
    dueDate?: string;
    projectId: string;
  },
  context: ContextType,
) {
  const userId = context.userId;
  if (!userId) {
    throw new Error("You are not authorized to create a task");
  }
  const newTask = await db
    .insert(taskTable)
    .values({
      ...task,
      due_date: task.dueDate ? new Date(task.dueDate) : undefined,
      user_id: userId,
      project_id: task.projectId,
    })
    .returning();
  return newTask[0];
}

async function updateTask(
  _: any,
  task: {
    id: string;
    title?: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    labels?: string[];
  },
) {
  const { id, title, description, status, priority, labels } = task;
  const updatedTask = await db
    .update(taskTable)
    .set({ title, description, status, priority, labels })
    .where(eq(taskTable.id, id))
    .returning();
  return updatedTask[0];
}

async function deleteTask(_: any, { id }: { id: string }) {
  const task = await db
    .delete(taskTable)
    .where(eq(taskTable.id, id))
    .returning();
  return task[0];
}

async function deleteTasks(_: any, { ids }: { ids: string[] }) {
  const tasks = await db
    .delete(taskTable)
    .where(inArray(taskTable.id, ids))
    .returning();
  return tasks;
}

async function createEvent(
  _: any,
  newEvent: {
    title: string;
    description?: string;
    start: string;
    end: string;
    allDay: boolean;
    color: string;
    location?: string;
  },
  context: ContextType,
) {
  const event = await db
    .insert(eventTable)
    .values({
      ...newEvent,
      start: new Date(newEvent.start),
      end: new Date(newEvent.end),
      user_id: context.userId,
    })
    .returning();
  return event[0];
}

async function updateEvent(
  _: any,
  updatedEvent: {
    id: string;
    title?: string;
    description?: string;
    start?: string;
    end?: string;
    allDay?: boolean;
    color?: string;
    location?: string;
  },
) {
  const { id, start, end, ...rest } = updatedEvent;
  const event = await db
    .update(eventTable)
    .set({
      ...rest,
      start: start ? new Date(start) : undefined,
      end: end ? new Date(end) : undefined,
    })
    .where(eq(eventTable.id, id))
    .returning();
  return event[0];
}

async function deleteEvent(_: any, { id }: { id: string }) {
  const event = await db
    .delete(eventTable)
    .where(eq(eventTable.id, id))
    .returning();
  return event[0];
}
