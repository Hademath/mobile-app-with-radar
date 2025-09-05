import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z.string().trim(),
  remember_me: z.boolean(),
});

export type loginType = z.infer<typeof loginSchema>;
