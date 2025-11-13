import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { router } from "expo-router";
import Constants from "expo-constants";

let cachedToken: string | null = null;

/**
 * Gets the appropriate base URL based on environment
 * Priority for local development:
 * 1. If __DEV__ is true, auto-detect from Expo dev server
 * 2. For production builds, use EXPO_PUBLIC_BASE_URL from eas.json
 * 3. Final fallback to production URL
 */
function getBaseUrl(): string {
  // ✅ PRIORITY 1: Local development - always use auto-detection
  if (__DEV__) {
    const debuggerHost = Constants.expoConfig?.hostUri?.split(":")[0];
    if (debuggerHost) {
      const localUrl = `http://${debuggerHost}:5000/api`;
      console.log("🔧 Development mode - using:", localUrl);
      return localUrl;
    }
    // Fallback for local dev
    console.log("🔧 Development mode - using localhost");
    return "http://localhost:5000/api";
  }

  // ✅ PRIORITY 2: Production builds - use env variable from eas.json
  const envUrl = process.env.EXPO_PUBLIC_BASE_URL;
  if (envUrl) {
    console.log("🌐 Production build - using env:", envUrl);
    return envUrl;
  }

  // ✅ PRIORITY 3: Final fallback
  console.warn("⚠️ No BASE_URL found, using production fallback");
  return "https://artisteradar-user-api-vd39o.ondigitalocean.app/api";
}

const BASE_URL = getBaseUrl();

// Log once on startup
console.log("📍 API Base URL:", BASE_URL);

const baseInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const authInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 300000, // 5 minutes timeout for uploads
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

export const clearAuthToken = () => {
  cachedToken = null;
  console.log("🔓 Token cleared");
};

authInstance.interceptors.request.use(
  async (config) => {
    try {
      // Use cached token first
      if (cachedToken) {
        config.headers.Authorization = `Bearer ${cachedToken}`;
        return config;
      }

      // If no cached token, read from AsyncStorage
      const storedData = await AsyncStorage.getItem("user");

      if (storedData) {
        const parsed = JSON.parse(storedData);
        const authToken = parsed?.token;

        if (authToken) {
          cachedToken = authToken;
          config.headers.Authorization = `Bearer ${authToken}`;
          console.log("✅ Token loaded from AsyncStorage and cached");
        } else {
          console.warn("⚠️ No token found in parsed data");
          router.replace("/(auth)/Login/LoginScreen");
        }
      } else {
        console.warn("⚠️ No user data in AsyncStorage");
        router.replace("/(auth)/Login/LoginScreen");
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
    (response) => response,
    async (error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        console.log("🚫 Unauthorized - clearing auth and redirecting");
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
