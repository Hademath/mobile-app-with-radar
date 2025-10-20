import { z } from "zod";

export const unrealeasedMusicSchema = z.object({
  song: z
    .string()
    .min(1, "Please upload a music file")
    .refine((val) => val.length > 0, {
      message: "Song file is required",
    }),
  upload_as: z
    .string()
    .min(1, "Please select who you're uploading as")
    .refine((val) => val === "Artiste" || val === "Producer", {
      message: "Must be either Artiste or Producer",
    }),
  genre: z.string().min(1, "Please select a genre"),
  title: z.string().min(2, "Song title is required and must be 2 character minimum"),
});


export type unrealeasedMusicType = z.infer<typeof unrealeasedMusicSchema>;
