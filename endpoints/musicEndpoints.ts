import { AxiosResponse } from "axios";
import { authInstance,  } from "@/utils/apiService";
// import { unrealeasedMusicType } from "@/schemas/uploadMusicSchema";




  export const getAllSongs = async(): Promise<AxiosResponse<any>> => {
    try {
      const response = await authInstance.get("/songs/all-songs");
      return response;
    } catch (error) {
      // console.log("❌ Request failed:", JSON.stringify(error, null, 2));
      return Promise.reject(error);
    }
  }

  export const getSongById = async(songId: string): Promise<AxiosResponse<any>> => {
    try {
      const response = await authInstance.get(`/songs/get-song/${songId}`);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  export const getSongByIdIncludePrompts= async(songId: string): Promise<AxiosResponse<any>> => {
    try {
      const response = await authInstance.get(`/songs/song-campaign/${songId}`);
      return response;
    } catch (error) {
      // console.log("❌❌❌❌❌ Request failed:", JSON.stringify(error, null, 2));
      return Promise.reject(error);
    }
  }


  // export const uploadUnrealesedSong = async (
  //   data: any
  // ): Promise<AxiosResponse<any>> => {
  //   try {
  //     const formData = new FormData();

  //     // CRITICAL: Backend expects 'file', not 'song'
  //     if (data.song) {
  //       const fileUri = data.song;
  //       const fileName = fileUri.split("/").pop() || "audio.mp3";
  //       const fileType = fileName.split(".").pop()?.toLowerCase();

  //       // Determine MIME type
  //       let mimeType = "audio/mpeg";
  //       const mimeTypes: Record<string, string> = {
  //         mp3: "audio/mpeg",
  //         mp4: "audio/mp4",
  //         m4a: "audio/mp4",
  //         wav: "audio/wav",
  //         ogg: "audio/ogg",
  //         aac: "audio/aac",
  //         flac: "audio/flac",
  //         "3gp": "audio/3gpp",
  //       };
  //       if (fileType && mimeTypes[fileType]) {
  //         mimeType = mimeTypes[fileType];
  //       }

  //       // Changed from 'song' to 'file' to match backend
  //       formData.append("file", {
  //         uri: fileUri,
  //         name: fileName,
  //         type: mimeType,
  //       } as any);
  //     }

  //     // Add other fields
  //     if (data.title) formData.append("title", data.title);
  //     if (data.upload_as) formData.append("upload_as", data.upload_as);
  //     if (data.genre) formData.append("genre", data.genre);

  //     console.log("📤 Uploading to backend...", {
  //       title: data.title,
  //       genre: data.genre,
  //       fileName: data.song?.split("/").pop(),
  //     });

  //     const response = await authInstance.post("songs/upload", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //       // CRITICAL: Increase timeout for large files
  //       timeout: 300000, // 5 minutes
  //       // Optional: Track progress
  //       onUploadProgress: (progressEvent) => {
  //         const percentCompleted = Math.round(
  //           (progressEvent.loaded * 100) / (progressEvent.total || 1)
  //         );
  //         console.log(`📊 Upload Progress: ${percentCompleted}%`);
  //       },
  //     });

  //     console.log("✅ Upload successful:", response.data);
  //     return response;
  //   } catch (error: any) {
  //     console.error("❌ Upload failed:", {
  //       message: error?.message,
  //       response: error?.response?.data,
  //       status: error?.response?.status,
  //     });
  //     return Promise.reject(error);
  //   }
  // };

export const uploadUnrealesedSong = async ( data: any ): Promise<AxiosResponse<any>> => {
    try {
    // Create FormData
    const formData = new FormData();

    // Add the audio file
    if (data.song) {
      const fileUri = data.song;
      const fileName = fileUri.split("/").pop() || "audio.mp3";
      const fileType = fileName.split(".").pop();

      // Determine MIME type
      let mimeType = "audio/mpeg"; // default
      if (fileType === "mp4" || fileType === "m4a") {
        mimeType = "audio/mp4";
      } else if (fileType === "wav") {
        mimeType = "audio/wav";
      } else if (fileType === "ogg") {
        mimeType = "audio/ogg";
      }

      formData.append("song", {
        uri: fileUri,
        name: fileName,
        type: mimeType,
      } as any);
    }

    // Add other fields
    if (data.title) formData.append("title", data.title);
    if (data.upload_as) formData.append("upload_as", data.upload_as);
    if (data.genre) formData.append("genre", data.genre);

    console.log("📤 Uploading FormData:", formData);

    const response = await authInstance.post("songs/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    console.log("❌ Upload failed:", JSON.stringify(error, null, 2));
    return Promise.reject(error);
  }
};

export const extractLink = async ( data: any ): Promise<AxiosResponse<any>> => {
    try {
    const response = await authInstance.post("songs/extract-music-detail", data);
    return response;
  } catch (error) {
    console.log("❌ Upload failed:", JSON.stringify(error, null, 2));
    return Promise.reject(error);
  }
};


export const uploadReleasedMusic = async ( data: any ): Promise<AxiosResponse<any>> => {
    try {
    const response = await authInstance.post("songs/upload-song-link", data);
    return response;
  } catch (error) {
    console.log("❌❌❌❌ Upload failed:", JSON.stringify(error, null, 2));
    return Promise.reject(error);
  }
};


/// track music playback history
export const trackSongPlay = async ( data: { songId: string;  durationListened: number; } ): Promise<AxiosResponse<any>> => {
    try {
    const response = await authInstance.post("songs/track-play", data);
    return response;
  } catch (error) {
    console.log("❌ Tracking playback failed:", JSON.stringify(error, null, 2));
    return Promise.reject(error);
  }
}

/// get track music playback == /api/songs/track-play-history
export const getSongPlayHistory = async (): Promise<AxiosResponse<any>> => {
    try {
    const response = await authInstance.get(`songs/track-play-history`);
    return response;
  } catch (error) {
    console.log("❌ Fetching playback history failed:", JSON.stringify(error, null, 2));
    return Promise.reject(error);
  }
}