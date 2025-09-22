import { AxiosResponse } from "axios";
import { authInstance, baseInstance } from "@/utils/apiService";
import { registerType } from "@/schemas/registerSchema";
import { loginType } from "@/schemas/loginSchema";
import { ICreatePassword, ICreateProfile } from "@/utils/types";


export default class AuthEndpoints {
  async requestOtp(reason: string, email: string): Promise<AxiosResponse<any>> {
    try {
      const response = await baseInstance.post(
        `/auth/request-otp?reason=${reason}`,
        { email }
      );
      return response;
    } catch (error) {
      // console.log("error", error);
      return Promise.reject(error);
    }
  }

  async verifyEmail(data: {
    otp: string;
    email: string;
  }): Promise<AxiosResponse<any>> {
    try {
      return await baseInstance.put(`/auth/submit-otp`, data);
    } catch (error) {
      //  console.log("❌ Request failed:", JSON.stringify(error, null, 2));
      return Promise.reject(error);
    }
  }

  async registerUser(data: registerType): Promise<AxiosResponse<any>> {
    try {
      const response = await baseInstance.post("auth/register", data);
      return response;
    } catch (error) {
      // console.log("❌ validation failed:", JSON.stringify(error, null, 2));
      return Promise.reject(error);
    }
  }

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

  async verifyUsername(data: {
    username: string;
  }): Promise<AxiosResponse<any>> {
    try {
      return await baseInstance.post(`/auth/validate-username`, data);
    } catch (error) {
      //  console.log("❌ validation failed:", JSON.stringify(error, null, 2));
      return Promise.reject(error);
    }
  }

  async login(data: loginType): Promise<AxiosResponse<any>> {
    try {
      const response = await baseInstance.post("/auth/login", data);
      return response;
    } catch (error) {
      // console.log(error);
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

  async createPassword(data: ICreatePassword): Promise<AxiosResponse<any>> {
    try {
      const response = await baseInstance.put(
        `/auth/create_password?${data.params}`,
        data.payload
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async verifyForgotPassOtp(data: {
    token: string;
  }): Promise<AxiosResponse<any>> {
    try {
      return await baseInstance.put(`/auth/varify-resetpass-otp`, data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async forgotPassword(data: { email: string }): Promise<AxiosResponse<any>> {
    try {
      return await baseInstance.post("/auth/forgot-password", data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async resetPassword(data: {
    email: string;
    token: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<AxiosResponse<any>> {
    try {
      return await baseInstance.put(`/auth/reset-password`, data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getUserProfile(): Promise<AxiosResponse<any>> {
    try {
      const response = await authInstance.get("/user/profile");
      console.log("User profile response FRom API:", response);
      return response;
    } catch (error) {
      console.log("Api error",error)
      return Promise.reject(error);
    }
  }
}
