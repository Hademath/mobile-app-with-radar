import { AxiosResponse } from "axios";
import { authInstance, baseInstance } from "@/utils/apiService";
import { registerType } from "@/schemas/registerSchema";
import { loginType } from "@/schemas/loginSchema";
import { ICreatePassword, ICreateProfile } from "@/types/userTypes";



 export const requestOtp = async(reason: string, email: string): Promise<AxiosResponse<any>> =>{
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

 export const verifyEmail = async (data: { otp: string; email: string; }): Promise<AxiosResponse<any>> =>{
    try {
      return await baseInstance.put(`/auth/submit-otp`, data);
    } catch (error) {
      //  console.log("❌ Request failed:", JSON.stringify(error, null, 2));
      return Promise.reject(error);
    }
  }

 export const registerUser  = async(data: registerType): Promise<AxiosResponse<any>> =>{
    try {
      const response = await baseInstance.post("auth/register", data);
      return response;
    } catch (error) {
      // console.log("❌ validation failed:", JSON.stringify(error, null, 2));
      return Promise.reject(error);
    }
  }

 export const profileSetup  = async(data: ICreateProfile): Promise<AxiosResponse<any>> =>{
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

 export const verifyUsername  = async(data: { username: string; }): Promise<AxiosResponse<any>> =>{
    try {
      return await baseInstance.post(`/auth/validate-username`, data);
    } catch (error) {
      //  console.log("❌ validation failed:", JSON.stringify(error, null, 2));
      return Promise.reject(error);
    }
  }

 export const login  = async(data: loginType): Promise<AxiosResponse<any>> =>{
    try {
      const response = await baseInstance.post("/auth/login", data);
      return response;
    } catch (error) {
      // console.log(error);
      return Promise.reject(error);
    }
  }

 export const getGenres  = async(): Promise<AxiosResponse<any>> =>{
    try {
      const response = await authInstance.get("/user/genres");
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
 export const getAvatars  = async(): Promise<AxiosResponse<any>> =>{
    try {
      const response = await authInstance.get("/user/avatars");
      return response;
    } catch (error) {
      console.log("❌ Request failed:", JSON.stringify(error, null, 2));
      return Promise.reject(error);
    }
  }

 export const createPassword  = async(data: ICreatePassword): Promise<AxiosResponse<any>> =>{
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

 export const verifyForgotPassOtp  = async(data: {
    token: string;
  }): Promise<AxiosResponse<any>> =>{
    try {
      return await baseInstance.put(`/auth/varify-resetpass-otp`, data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

 export const forgotPassword  = async(data: { email: string }): Promise<AxiosResponse<any>> =>{
    try {
      return await baseInstance.post("/auth/forgot-password", data);
    } catch (error) {
      return Promise.reject(error);
    }
 }
  
 export const resetPassword  = async(data: {
    email: string;
    token: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<AxiosResponse<any>> =>{
    try {
      return await baseInstance.put(`/auth/reset-password`, data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

 export const getUserProfile  = async(): Promise<AxiosResponse<any>> =>{
    try {
      const response = await authInstance.get("/user/profile");
      return response;
    } catch (error) {
      console.log("Api error",error)
      return Promise.reject(error);
    }
  }



// WebSocket connection (if added WebSockets later)
// const ws = new WebSocket(BASE_URL.replace('http', 'ws'));