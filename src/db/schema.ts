import { relations } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
} from "drizzle-orm/pg-core";

export const taskStatusEnum = pgEnum("status", ["TODO", "IN_PROGRESS", "DONE"]);
export const taskPriorityEnum = pgEnum("priority", ["LOW", "MEDIUM", "HIGH"]);
export interface TaskComment {
  id: string;
  user_id: string;
  content: string;
  created_at: Date;
}
export const themeEnum = pgEnum("theme", ["light", "dark", "system"]);

export const userTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  google_id: text("google_id").unique(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  password_hash: text("password_hash"),
  profile_picture: text("profile_picture"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const sessionTable = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id")
    .references(() => userTable.id, { onDelete: "cascade" })
    .notNull(),
  expires_at: timestamp("expires_at").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const projectTable = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  summary: text("summary"),
  description: text("description"),
  priority: taskPriorityEnum("priority").default("LOW"),
  color: text("color").default("sky"),
  picture: text("picture"),
  due_date: timestamp("due_date"),
  user_id: uuid("user_id")
    .references(() => userTable.id, { onDelete: "cascade" })
    .notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const taskTable = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  status: taskStatusEnum("status").default("TODO").notNull(),
  priority: taskPriorityEnum("priority").default("LOW").notNull(),
  labels: text("labels").array().$type<string[]>(),
  due_date: timestamp("due_date"),
  comments: text("comments").array().$type<TaskComment[]>(),
  project_id: uuid("project_id")
    .references(() => projectTable.id, { onDelete: "cascade" })
    .notNull(),
  user_id: uuid("user_id")
    .references(() => userTable.id, { onDelete: "cascade" })
    .notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
  completed_at: timestamp("completed_at"),
});

export const eventTable = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  start: timestamp("start_time").notNull(),
  end: timestamp("end_time").notNull(),
  allDay: boolean("all_day").default(false).notNull(),
  color: text("color").default("sky"),
  location: text("location"),
  user_id: uuid("user_id")
    .references(() => userTable.id, { onDelete: "cascade" })
    .notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const notificationTable = pgTable("notifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id")
    .references(() => userTable.id, { onDelete: "cascade" })
    .notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  category: text("type").$type<"general" | "reminder">().default("general"),
  isRead: boolean("is_read").default(false).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const userSettingsTable = pgTable("user_settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id")
    .references(() => userTable.id, { onDelete: "cascade" })
    .notNull(),

  // profile
  timezone: text("timezone").default("UTC").notNull(),
  theme: themeEnum("theme").default("dark").notNull(),

  // timestamps
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

/* Relations */

// export const userRelations = relations(userTable, ({ many }) => ({
//   sessions: many(sessionTable),
//   projects: many(projectTable),
//   tasks: many(taskTable),
// }));

// export const projectRelations = relations(projectTable, ({ one, many }) => ({
//   user: one(userTable),
//   tasks: many(taskTable),
// }));

// export const taskRelations = relations(taskTable, ({ one }) => ({
//   user: one(userTable),
//   project: one(projectTable),
// }));
