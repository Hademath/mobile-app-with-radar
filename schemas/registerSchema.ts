import { z } from "zod";


export const firstNameSchema = z.object({
  firstName: z.string().min(2, "First name is too short"),
});

export const lastNameSchema = z.object({
  lastName: z.string().min(2, "Last name is too short"),
});

export const emailSchema = z.object({
  input: z.string().email("Invalid email address"),
});



export const registerSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }),
  country: z.string().min(2),
  state: z.string().min(2),
  avatar: z.string().url().optional(),
});


export type registerType = z.infer<typeof registerSchema>;
