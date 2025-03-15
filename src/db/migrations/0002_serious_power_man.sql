CREATE TYPE "public"."priority" AS ENUM('LOW', 'MEDIUM', 'HIGH');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('TODO', 'IN_PROGRESS', 'DONE');--> statement-breakpoint
ALTER TABLE "tasks" RENAME COLUMN "name" TO "title";--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "status" "status" DEFAULT 'TODO' NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "priority" "priority" DEFAULT 'LOW' NOT NULL;