import { z } from "zod";

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

export const CreateProjectFormSchema = z
  .object({
    name: z.string().min(1, "Project name is required"),
    description: z.string().optional(),
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
