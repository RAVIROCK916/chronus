import { randomUUID } from "crypto";
import bcrypt from "bcrypt";
import db from "./index";
import {
  eventTable,
  notificationTable,
  projectTable,
  sessionTable,
  taskTable,
  userTable,
} from "./schema";
import { getRandomStyledAvatar } from "@/utils/avatar";

async function main() {
  console.log("Seeding...");

  // Create users
  const users = await Promise.all(
    Array.from({ length: 2 }, async (_, i) => {
      const password_hash = await bcrypt.hash("testtest", 10);
      const user = await db
        .insert(userTable)
        .values({
          id: randomUUID(),
          name: `Test User ${i + 1}`,
          email: `user${i + 1}@example.com`,
          password_hash,
          profile_picture: getRandomStyledAvatar("notionists"),
        })
        .returning();
      return user[0];
    }),
  );

  // Create projects for each user
  for (const user of users) {
    const projects = await Promise.all(
      Array.from({ length: 5 }, async (_, i) => {
        const project = await db
          .insert(projectTable)
          .values({
            id: randomUUID(),
            name: `Project ${i + 1}`,
            description: `Description for project ${i + 1}`,
            user_id: user.id,
          })
          .returning();
        return project[0];
      }),
    );

    // Create tasks for each project
    for (const project of projects) {
      await Promise.all(
        Array.from({ length: 10 }, async (_, i) => {
          const priorities = ["LOW", "MEDIUM", "HIGH"] as const;
          const statuses = ["TODO", "IN_PROGRESS", "DONE"] as const;

          // Generate random values for each field
          const id = randomUUID();
          const title = `Task ${i + 1}`;
          const description =
            "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
          const status = statuses[Math.floor(Math.random() * statuses.length)];
          const priority =
            priorities[Math.floor(Math.random() * priorities.length)];
          const labels = ["bug", "feature", "enhancement"];
          const due_date = new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000);
          const created_at = new Date(
            Date.now() - Math.floor(Math.random() * 10 * 24 * 60 * 60 * 1000),
          );
          const updated_at = new Date(
            created_at.getTime() +
              Math.floor(Math.random() * 10 * 24 * 60 * 60 * 1000),
          );
          const completed_at =
            status === "DONE"
              ? new Date(
                  updated_at.getTime() +
                    Math.floor(Math.random() * 10 * 24 * 60 * 60 * 1000),
                )
              : null;
          await db.insert(taskTable).values({
            id,
            title,
            description,
            status,
            priority,
            due_date,
            labels,
            created_at,
            updated_at,
            completed_at,
            project_id: project.id,
            user_id: user.id,
          });
        }),
      );
    }

    // Create events for each user
    await Promise.all(
      Array.from({ length: 10 }, async (_, i) => {
        const start = new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000);
        const end = new Date(start.getTime() + 60 * 60 * 1000);
        await db.insert(eventTable).values({
          id: randomUUID(),
          title: `Event ${i + 1}`,
          description: `Description for event ${i + 1}`,
          start,
          end,
          allDay: [true, false][Math.floor(Math.random() * 2)],
          color: ["sky", "amber", "rose"][Math.floor(Math.random() * 3)],
          location: ["Home", "Work", "School"][Math.floor(Math.random() * 3)],
          user_id: user.id,
        });
      }),
    );

    // Create notifications for each user
    await Promise.all(
      Array.from({ length: 2 }, async (_, i) => {
        await db.insert(notificationTable).values({
          id: randomUUID(),
          message: "lorem ipsum dolor sit amet consectetur adipiscing elit",
          is_read: [true, false][Math.floor(Math.random() * 2)],
          user_id: user.id,
        });
      }),
    );

    // Create sessions for each user
    // await Promise.all(
    //   Array.from({ length: 2 }, async () => {
    //     await db.insert(sessionTable).values({
    //       id: randomUUID(),
    //       user_id: user.id,
    //       expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
    //     });
    //   }),
    // );
  }

  console.log("Seeding completed!");
}

main().catch((e) => {
  console.error("Error seeding:", e);
  process.exit(1);
});
