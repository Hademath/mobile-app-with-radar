import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { router } from "expo-router";
import Constants from "expo-constants";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
let cachedToken: string | null = null;

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


export const setAuthToken = (token: string | null) => {
  cachedToken = token;
  console.log(
    "🔑 Token cached:",
    token ? token.substring(0, 20) + "..." : "null"
  );
};

// ✅ Function to clear token (call this on logout)
export const clearAuthToken = () => {
  cachedToken = null;
  console.log("🔓 Token cleared");
};



authInstance.interceptors.request.use(
  async (config) => {
    try {
      // ✅ First, try to use cached token
      if (cachedToken) {
        config.headers.Authorization = `Bearer ${cachedToken}`;
        console.log("✅ Using cached token");
        return config;
      }

      // ✅ If no cached token, read from AsyncStorage
      const storedData = await AsyncStorage.getItem("user");

      if (storedData) {
        const parsed = JSON.parse(storedData);
        const authToken = parsed?.token;

        if (authToken) {
          cachedToken = authToken; // Cache it for future requests
          config.headers.Authorization = `Bearer ${authToken}`;
          console.log("✅ Token loaded from AsyncStorage and cached");
        } else {
          console.log("⚠️ No token found in parsed data"); 
        }
      } else {
        console.log("⚠️ No user data in AsyncStorage");
      }

      return config;
    } catch (error) {
      console.error("❌ Error reading token from storage:", error);
      return config;
    }
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
      if (error.response?.status === 401 || error.response?.status === 403) {
        clearAuthToken(); // Clear cached token
        queryClient.clear();
        logout();
        router.replace("/(auth)/Login/LoginScreen");
      }
      return Promise.reject(error);
    }
  );
};

export { authInstance, baseInstance };
