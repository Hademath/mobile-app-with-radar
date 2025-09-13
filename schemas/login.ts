import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  remember_me: z.boolean().optional(),
});

export type loginType = z.infer<typeof loginSchema>;
