import { AxiosResponse } from "axios";
import { authInstance,  } from "@/utils/apiService";
import { ICreateProfile } from "@/utils/types";


export default class AuthEndpoints {



  async profileSetup(data: ICreateProfile): Promise<AxiosResponse<any>> {
    try {
      const response = await authInstance.put(`/user/profile_setup`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }



  async getGenres(): Promise<AxiosResponse<any>> {
    try {
      const response = await authInstance.get("/user/genres");
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async getAvatars(): Promise<AxiosResponse<any>> {
    try {
      const response = await authInstance.get("/user/avatars");
      return response;
    } catch (error) {
       console.log("❌ Request failed:", JSON.stringify(error, null, 2));
      return Promise.reject(error);
    }
  }

}
