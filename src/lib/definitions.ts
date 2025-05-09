import { z } from "zod";
import { Project } from "@/types";

export const LoginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const SignupFormSchema = z
  .object({
    email: z.string().trim().email("Invalid email address"),
    password: z.string().min(4, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(4, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const onboardingFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
});

export const createProjectFormSchema = (projects: Project[]) =>
  z
    .object({
      name: z.string().trim().min(1, "Project name is required").max(20),
      summary: z.string().trim().max(200),
      description: z.string().trim().max(1000).optional(),
      color: z.string().default("sky"),
    })
    .refine((data) => !projects.find((project) => project.name === data.name), {
      message: "Project name already exists",
      path: ["name"],
    })
    .refine(
      (data) => {
        if (data.description) return data.description.length >= 3;
        return true;
      },
      {
        message: "Description must be at least 3 characters",
        path: ["description"],
      },
    );

export const createTaskFormSchema = z.object({
  title: z.string().trim().min(1, "Task title is required"),
  description: z.string().trim().max(500).optional(),
  status: z.string().default("todo"),
  priority: z.string().default("low"),
  labels: z.string().array().optional(),
  dueDate: z.date().nullable().optional(),
});
