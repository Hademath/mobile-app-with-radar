import { AxiosResponse } from "axios";
import { baseInstance } from "@/utils/apiService";
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
  async requestOtp(email: string): Promise<AxiosResponse<any>> {
    try {
      return await baseInstance.put(`/auth/request-otp?reason=${email}`);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async registerUser(data: registerType): Promise<AxiosResponse<any>> {
    try {
      const response = await baseInstance.post("/register", data);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async login(data: loginType): Promise<AxiosResponse<any>> {
    try {
      const response = await baseInstance.post("/login", data);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async getCommunities(): Promise<AxiosResponse<any>> {
    try {
      const response = await baseInstance.get("/all_community");
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async createPassword(data: ICreatePassword): Promise<AxiosResponse<any>> {
    try {
      const response = await baseInstance.put(
        `/create_password?${data.params}`,
        data.payload
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async forgotPassword(data: { email: string }): Promise<AxiosResponse<any>> {
    try {
      return await baseInstance.post("/forgot_password", data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async resetPassword(data: {
    email: string;
    token: string;
    payload: { new_password: string; confirm_password: string };
  }): Promise<AxiosResponse<any>> {
    try {
      return await baseInstance.post(
        `/password/reset/${data.token}?email=${data.email}`,
        data.payload
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async verifyEmail(otp: string): Promise<AxiosResponse<any>> {
    try {
      return await baseInstance.put(`/verify_otp?token=${otp}`);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
