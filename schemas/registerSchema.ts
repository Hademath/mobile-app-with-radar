import { z } from "zod";
import { no } from "zod/v4/locales";


export const firstNameSchema = z.object({
  firstName: z.string().min(2, "First name is too short"),
});

export const lastNameSchema = z.object({
  lastName: z.string().min(2, "Last name is too short"),
});

export const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const passwordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters").regex (/[A-Z]/, "Password must contain at least one uppercase letter").regex (/[a-z]/, "Password must contain at least one lowercase letter").regex (/[0-9]/, "Password must contain at least one number").regex (/[\W_]/, "Password must contain at least one special character"),
});

export const addressSchema = z.object({
  country: z.string().min(2, "Country is too short"),
  state: z.string().min(2, "State is too short"),
  city: z.string().min(2, "City is too short"),
});

export const genderSchema = z.object({
  gender: z.enum(["Male", "Female", "Other"], {
    errorMap: () => ({ message: "Invalid gender" }),
  }),
});

export const dateSchema = z.object({
  dateOfBirth: z.date({
      invalid_type_error: "Invalid date",
    })
    .max(new Date(), "Date of birth cannot be in the future")
    .refine((date) => {
      const age = new Date().getFullYear() - date.getFullYear();
      return age >= 16;
    }, "You must be at least 16 years old"),
});
export const registerSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }),
  country: z.string().min(2),
  state: z.string().min(2),
  city: z.string().min(2),
});


// Onboarding schema for additional profile setup
export const profileNameSchema = z.object({
  role: z.string(),
});
export const notificationSchema = z.object({
  notification: z.boolean(),
});

export const usernameSchema = z.object({
  username: z.string().min(2, "Username is too short"),
});


export const onboardingSchema = z.object({
  role: z.string(),
  username: z.string().min(3),
  avatarType: z.string().min(2),
  avatar: z.string().url().optional(),
  genres: z.string().url().optional(),
  notification: z.boolean().optional(),
});




export type registerType = z.infer<typeof registerSchema>;
