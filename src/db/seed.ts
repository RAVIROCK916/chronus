import { randomUUID } from "crypto";
import db from "./index";
import {
  notificationTable,
  projectTable,
  sessionTable,
  taskTable,
  userTable,
} from "./schema";

async function main() {
  console.log("Seeding...");

  // Create users
  const users = await Promise.all(
    Array.from({ length: 5 }, async (_, i) => {
      const user = await db
        .insert(userTable)
        .values({
          id: randomUUID(),
          name: `Test User ${i + 1}`,
          email: `user${i + 1}@example.com`,
          password_hash: "hashed_password",
        })
        .returning();
      return user[0];
    }),
  );

  // Create projects for each user
  for (const user of users) {
    const projects = await Promise.all(
      Array.from({ length: 3 }, async (_, i) => {
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
        Array.from({ length: 5 }, async (_, i) => {
          const priorities = ["LOW", "MEDIUM", "HIGH"] as const;
          const statuses = ["TODO", "IN_PROGRESS", "DONE"] as const;

          await db.insert(taskTable).values({
            id: randomUUID(),
            title: `Task ${i + 1}`,
            description: `Description for task ${i + 1}`,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            priority: priorities[Math.floor(Math.random() * priorities.length)],
            labels: ["bug", "feature", "enhancement"],
            project_id: project.id,
            user_id: user.id,
          });
        }),
      );
    }

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
