import db from "@/db";
import {
  eventTable,
  notificationTable,
  projectTable,
  sessionTable,
  taskTable,
  userTable,
} from "@/db/schema";
import { and, eq, gte, inArray, or } from "drizzle-orm";
import bcrypt from "bcrypt";
import { ContextType } from "@/types/graphql";
import { NotificationCategory, TaskPriority, TaskStatus } from "@/types";
import { getRandomAvatar } from "@/utils/avatar";
import { sub } from "date-fns";

export const resolvers = {
  Query: {
    hello: () => "Hello world!",
    user: getUser,
    currentUser: getCurrentUser,
    googleUser: getGoogleUser,
    users: getUsers,
    projects: getProjects,
    project: getProject,
    tasks: getTasks,
    task: getTask,
    lastWeekTasks: getLastWeekTasks,
    events: getEvents,
    notifications: getNotifications,
  },
  Mutation: {
    createUser,
    createGoogleUser,
    updateGoogleUser,
    loginUser,
    logoutUser,
    updateUser,
    verifyUser,
    createProject,
    updateProject,
    deleteProject,
    deleteProjects,
    createTask,
    updateTask,
    deleteTask,
    deleteTasks,
    createEvent,
    updateEvent,
    deleteEvent,
    updateNotification,
  },
  User: {
    projects: getProjects,
    events: getEvents,
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

async function getUser(_: any, { id }: { id: string }) {
  const user = await db.select().from(userTable).where(eq(userTable.id, id));
  return user[0];
}

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

async function getGoogleUser(_: any, { google_id }: { google_id: string }) {
  const user = await db
    .select()
    .from(userTable)
    .where(eq(userTable.google_id, google_id));
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

async function getLastWeekTasks(_: any, __: any, context: ContextType) {
  const tasks = await db
    .select()
    .from(taskTable)
    .where(
      and(
        eq(taskTable.user_id, context.userId),
        or(
          gte(taskTable.created_at, sub(new Date(), { days: 7 })),
          gte(taskTable.updated_at, sub(new Date(), { days: 7 })),
        ),
      ),
    );
  return tasks;
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

async function getNotifications(_: any, __: any, context: ContextType) {
  const notifications = await db
    .select()
    .from(notificationTable)
    .where(eq(notificationTable.user_id, context.userId));
  return notifications;
}

/* Mutation */

async function createUser(
  _: any,
  { email, password }: { email: string; password: string },
) {
  const name = "User" + Math.random().toString().substring(2, 8);
  const password_hash = await bcrypt.hash(password, 10);
  const profile_picture = getRandomAvatar();
  const user = await db
    .insert(userTable)
    .values({ name, email, password_hash, profile_picture })
    .returning();
  return user[0];
}

async function createGoogleUser(
  _: any,
  {
    google_id,
    name,
    email,
    profile_picture,
  }: {
    google_id: string;
    name: string;
    email: string;
    profile_picture: string;
  },
) {
  const user = await db
    .insert(userTable)
    .values({
      google_id,
      name,
      email,
      profile_picture,
    })
    .returning();
  return user[0];
}

async function updateGoogleUser(
  _: any,
  {
    google_id,
    name,
    email,
    profile_picture,
  }: {
    google_id: string;
    name: string;
    email: string;
    profile_picture?: string;
  },
) {
  const user = await db
    .update(userTable)
    .set({
      name,
      email,
      profile_picture,
    })
    .where(eq(userTable.google_id, google_id))
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
  if (!user[0]) {
    throw new Error("User not found", {
      cause: {
        code: "UNAUTHORIZED",
        message: "User not found",
      },
    });
  }
  const password_hash = user[0].password_hash;
  if (!password_hash) {
    throw new Error("This account was created with Google. Use Google login.", {
      cause: {
        code: "UNAUTHORIZED",
        http: { status: 401 },
      },
    });
  }

  // const isPasswordCorrect = await bcrypt.compare(password, password_hash);
  // if (!isPasswordCorrect) { {
  //   return null;
  // }

  return user[0];
}

async function logoutUser(_: any, __: string, context: ContextType) {
  console.log("logoutUser", context);
  try {
    await db
      .delete(sessionTable)
      .where(
        and(
          eq(sessionTable.user_id, context.userId),
          eq(sessionTable.id, context.sessionId),
        ),
      );
    return true;
  } catch (error) {
    console.error("Failed to logout user from the server:", error);
    return false;
  }
}

async function updateUser(
  _: any,
  user: {
    id: string;
    name?: string;
    email?: string;
    password_hash?: string;
    profile_picture?: string;
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

async function verifyUser(_: any, __: any, context: ContextType) {
  const userId = context.userId;
  const sessionId = context.sessionId;
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
  {
    name,
    summary,
    description,
    priority,
    color,
    picture,
    due_date,
  }: {
    name: string;
    summary?: string;
    description?: string;
    priority: TaskPriority;
    color: string;
    picture?: string;
    due_date?: string;
  },
  context: ContextType,
) {
  const project = await db
    .insert(projectTable)
    .values({
      user_id: context.userId,
      name,
      summary,
      description,
      priority,
      color,
      picture,
      due_date: due_date ? new Date(due_date) : undefined,
    })
    .returning();
  return project[0];
}

async function updateProject(
  _: any,
  {
    id,
    name,
    summary,
    description,
    color,
    due_date,
    picture,
  }: {
    id: string;
    name?: string;
    summary?: string;
    description?: string;
    color?: string;
    due_date?: string;
    picture?: string;
  },
) {
  const project = await db
    .update(projectTable)
    .set({
      name,
      summary,
      description,
      color,
      due_date: due_date ? new Date(due_date) : undefined,
      picture,
    })
    .where(eq(projectTable.id, id))
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

async function deleteProjects(_: any, { ids }: { ids: string[] }) {
  const projects = await db
    .delete(projectTable)
    .where(inArray(projectTable.id, ids))
    .returning();
  return projects;
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
    due_date?: string;
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
      due_date: task.due_date ? new Date(task.due_date) : undefined,
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
    due_date?: string;
  },
) {
  const { id, title, description, status, priority, labels, due_date } = task;
  const updatedTask = await db
    .update(taskTable)
    .set({
      title,
      description,
      status,
      priority,
      labels,
      due_date: due_date ? new Date(due_date) : undefined,
    })
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
    all_day: boolean;
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
    all_day?: boolean;
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

/* Notifications */

async function createWelcomeNotification(userId: string) {
  const notification = await db
    .insert(notificationTable)
    .values({
      user_id: userId,
      title: "Welcome to Chronus",
      message: "You've successfully signed up to Chronus!",
      category: "general",
    })
    .returning();
  return notification[0];
}

async function updateNotification(
  _: any,
  {
    id,
    title,
    message,
    category,
    is_read,
  }: {
    id: string;
    title: string;
    message: string;
    category: NotificationCategory;
    is_read: boolean;
  },
  context: ContextType,
) {
  const notification = await db
    .update(notificationTable)
    .set({
      title,
      message,
      category,
      is_read,
      user_id: context.userId,
    })
    .where(eq(notificationTable.id, id))
    .returning();
  return notification[0];
}
