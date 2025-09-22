import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  remember_me: z.boolean().optional(),
});

export const resetpasswordSchema = z.object({
    email: z.string().email(),
    token: z.string(),
    newPassword: z .string() .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string().min(1, { message: "Confirm password is required" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})


export type loginType = z.infer<typeof loginSchema>;
export type resetpasswordType = z.infer<typeof resetpasswordSchema>;
