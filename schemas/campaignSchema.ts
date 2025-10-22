import { z } from "zod";

export const campaignSchema = z.object({
  targetAudience: z
    .string()
    .min(1, "target audience is required")
    .refine(
      (val) =>  val === "music-pro" || val === "listener",
      {
        message: "Must be either Music Pro or Listener",
      }
    ),
  ageGroup: z.string(),
  duration: z.number().min(1, "Duration must be at least 1 day"),
  estimated_reach:  z.object({
    min: z.number().min(1, "Minimum estimated reach is required"),
    max: z.number().min(1, "Maximum estimated reach is required"),
  }),
});


export type campaignType = z.infer<typeof campaignSchema>;
export type promptType = {
  question: string;
  allow_multiple_choice: boolean;
  options: { option: string }[];
}[];
