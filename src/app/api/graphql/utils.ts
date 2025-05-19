import db from "@/db";
import { notificationTable } from "@/db/schema";

export async function setupUser(id: string) {
  await db.insert(notificationTable).values({
    user_id: id,
    title: "Welcome to Chronus",
    message: "You've successfully signed up to Chronus!",
    category: "general",
  });
}
