import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { router } from "expo-router";
import Constants from "expo-constants";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

function getBaseUrl() {
  if (__DEV__) {
    // Development:  resolve IP from Expo dev server
    const debuggerHost = Constants.expoConfig?.hostUri?.split(":")[0];
    if (debuggerHost) {
      return `http://${debuggerHost}:5000/api`;
    }
    // fallback 
    return "http://localhost:5000/api";
  } else {
    // Production
    return BASE_URL || "https://api.artisteradar.com/api";
  }
}

const baseInstance = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

const authInstance = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

authInstance.interceptors.request.use(
  async (config) => {
    let authToken;
    const storedData = await AsyncStorage.getItem("user");
    // console.log("work data",storedData)
    if (storedData) {
      authToken = JSON.parse(storedData).token;
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
