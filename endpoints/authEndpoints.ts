import { AxiosResponse } from "axios";
import { authInstance, baseInstance } from "@/utils/apiService";
import { registerType } from "@/schemas/registerSchema";
import { loginType } from "@/schemas/login";

interface ICreatePasswordData {
  password: string;
  confirm_password: string;
}

interface ICreatePassword {
  params: string;
  payload: ICreatePasswordData;
}
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

  async verifyEmail(data: { otp: string; email: string; }): Promise<AxiosResponse<any>> {
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
       console.log("❌ validation failed:", JSON.stringify(error, null, 2));
      return Promise.reject(error);
    }
  }
  
  async profileSetup(data: ICreatePassword): Promise<AxiosResponse<any>> {
    try {
      const response = await authInstance.put(`/user/profile_setup`, data);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async verifyUsername(data: {username: string; }): Promise<AxiosResponse<any>> {
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
  
  async createPassword(data: ICreatePassword): Promise<AxiosResponse<any>> {
    try {
      const response = await baseInstance.put( `/auth/create_password?${data.params}`, data.payload );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async verifyForgotPassOtp(data: { token: string; }): Promise<AxiosResponse<any>> {
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
  async resetPassword(data: { email: string; token: string;  newPassword: string; confirmPassword: string  }): Promise<AxiosResponse<any>> {
    try {
      return await baseInstance.put(`/auth/reset-password`, data );
    } catch (error) {

      return Promise.reject(error);
    }
  }
}
