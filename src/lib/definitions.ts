import { z } from "zod";
import { Project } from "@/types";

export const LoginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const SignupFormSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(4, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(4, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const createProjectFormSchema = (projects: Project[]) =>
  z
    .object({
      name: z.string().trim().min(1, "Project name is required"),
      description: z.string().optional(),
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
