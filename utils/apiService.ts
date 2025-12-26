import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { router } from "expo-router";
import Constants from "expo-constants";

let cachedToken: string | null = null;

// ========================================
// 🔧 ENVIRONMENT CONFIGURATION
// ========================================

function getBaseUrl(): string {
  // If we have an environment variable, use it (for production builds)
  const envUrl = process.env.EXPO_PUBLIC_BASE_URL;
  if (envUrl) {
    console.log("Using EXPO_PUBLIC_BASE_URL:", envUrl);
    return envUrl;
  }

  // In development, auto-detect the local IP
  if (__DEV__) {
    const debuggerHost = Constants.expoConfig?.hostUri?.split(":")[0];
    if (debuggerHost) {
      const localUrl = `http://${debuggerHost}:5000/api`;
      console.log("Auto-detected local URL:", localUrl);  
      return localUrl;
    }
  }

  // Fallback to production
  const fallback = "https://artisteradar-user-api-vd39o.ondigitalocean.app/api";
  console.log("Using fallback URL:", fallback);
  return fallback;
}

const BASE_URL = getBaseUrl();

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("📍 API Configuration");
console.log("   Base URL:", BASE_URL);
console.log("   Dev Mode:", __DEV__);
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

// ========================================
// 🔌 AXIOS INSTANCES
// ========================================

const baseInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

const authInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ========================================
// 🔐 TOKEN MANAGEMENT
// ========================================

export const setAuthToken = (token: string | null) => {
  cachedToken = token;
};

export const clearAuthToken = () => {
  cachedToken = null;
};

// ========================================
// 🔒 REQUEST INTERCEPTOR
// ========================================

authInstance.interceptors.request.use(
  async (config) => {
    try {
      if (cachedToken) {
        config.headers.Authorization = `Bearer ${cachedToken}`;
        return config;
      }

      const storedData = await AsyncStorage.getItem("user");

      if (storedData) {
        const parsed = JSON.parse(storedData);
        const authToken = parsed?.token;

        if (authToken) {
          cachedToken = authToken;
          config.headers.Authorization = `Bearer ${authToken}`;
        } else {
          router.replace("/(auth)/Login/LoginScreen");
        }
      } else {
        router.replace("/(auth)/Login/LoginScreen");
      }

      return config;
    } catch (error) {
      console.error("Error reading token:", error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ========================================
// 📥 RESPONSE INTERCEPTOR
// ========================================

baseInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // console.error("API Error:", {
    //   url: error.config?.url,
    //   status: error.response?.status,
    //   message: error.message,
    // });
    return Promise.reject(error);
  }
);

authInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

export const useResponseInterceptor = (logout: VoidFunction) => {
  const queryClient = useQueryClient();

  authInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        clearAuthToken();
        await AsyncStorage.removeItem("user");
        queryClient.clear();
        logout();
        router.replace("/(auth)/Login/LoginScreen");
      }
      return Promise.reject(error);
    }
  );
};

export { authInstance, baseInstance, BASE_URL };
