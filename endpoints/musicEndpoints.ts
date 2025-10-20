import { AxiosResponse } from "axios";
import { authInstance,  } from "@/utils/apiService";
import { unrealeasedMusicType } from "@/schemas/unrealeasedMusicSchema";




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

export const uploadUnrealesedSong = async ( data: unrealeasedMusicType ): Promise<AxiosResponse<any>> => {
   try {
     const response = await authInstance.post("songs/upload", data, {
       headers: {
         "Content-Type": "multipart/form-data",
       },
     });
     return response;
   } catch (error) {
     return Promise.reject(error);
   }
};
