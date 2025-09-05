import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { router } from "expo-router";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

const baseInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const authInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

authInstance.interceptors.request.use(
  async (config) => {
    let authToken;
    const storedData = await AsyncStorage.getItem("user");
    if (storedData) {
      authToken = JSON.parse(storedData).access_token;
    }
    if (authToken) {
      config.headers.Authorization = "Bearer " + authToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const useResponseInterceptor = (logout: VoidFunction) => {
  const queryClient = useQueryClient();
  authInstance.interceptors.response.use(
    async (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        queryClient.clear();
        logout();
        router.replace("/(auth)/Login/LoginScreen");
      }
      return Promise.reject(error);
    }
  );
};

export { authInstance, baseInstance };
