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


export const releasedMusicSchema = z.object({
  songUrl: z
    .string()
    .min(1, "Please provide a link to your released music")
    .url("Please provide a valid URL"),
  // upload_as: z
  //   .string()
  //   .min(1, "Please select who you're uploading as")
  //   .refine((val) => val === "Artiste" || val === "Producer", {
  //     message: "Must be either Artiste or Producer",
  //   }),
  externalPlatform: z
    .string()
    .min(1, "Please select the external platform")
    .refine(
      (val) =>
        // val === "Artiste" ||
        val === "spotify" ||
        val === "apple-music" ||
        val === "youtube" ||
        val === "sound-cloud",
      {
        message:
          "Must be one of: Artiste, Spotify, Apple Music, YouTube Music, SoundCloud",
      }
    ),
});




export type unrealeasedMusicType = z.infer<typeof unrealeasedMusicSchema>;
export type releasedMusicType = z.infer<typeof releasedMusicSchema>;
