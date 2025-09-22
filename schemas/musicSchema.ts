import { z } from "zod";

export const songSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }),
  country: z.string().min(2),
  state: z.string().min(2),
  city: z.string().min(2),
});




export type songCampaignType = z.infer<typeof songSchema>;