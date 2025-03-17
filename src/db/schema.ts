import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const taskStatusEnum = pgEnum("status", ["TODO", "IN_PROGRESS", "DONE"]);
export const taskPriorityEnum = pgEnum("priority", ["LOW", "MEDIUM", "HIGH"]);

export const userTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  password_hash: text("password_hash").notNull(),
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
  description: text("description"),
  user_id: uuid("user_id")
    .references(() => userTable.id, { onDelete: "cascade" })
    .notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const folderTable = pgTable("folders", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  project_id: uuid("project_id")
    .references(() => projectTable.id, { onDelete: "cascade" })
    .notNull(),
  user_id: uuid("user_id")
    .references(() => userTable.id, { onDelete: "cascade" })
    .notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const taskTable = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  status: taskStatusEnum("status").default("TODO").notNull(),
  priority: taskPriorityEnum("priority").default("LOW").notNull(),
  project_id: uuid("project_id")
    .references(() => projectTable.id, { onDelete: "cascade" })
    .notNull(),
  user_id: uuid("user_id")
    .references(() => userTable.id, { onDelete: "cascade" })
    .notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
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
