import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { router } from "expo-router";
import Constants from "expo-constants";

let cachedToken: string | null = null;

// ========================================
// 🔧 ENVIRONMENT CONFIGURATION
// ========================================
// Comment/uncomment the URL you want to use:

const API_URLS = {
  // 🏠 Local Development (auto-detects your machine's IP)
  LOCAL: "auto-detect", // Will use http://YOUR_IP:5000/api

  // 🌐 Production/Live Server
  PRODUCTION: "https://artisteradar-user-api-vd39o.ondigitalocean.app/api",
};

// ⚙️ SET YOUR ACTIVE ENVIRONMENT HERE:
// - Use "LOCAL" when running with Expo Go or expo start
// - Use "PRODUCTION" for preview/production builds
// Note: EAS builds will override this with EXPO_PUBLIC_BASE_URL from eas.json
const ACTIVE_ENV: "LOCAL" | "PRODUCTION" = "LOCAL"; // 👈 CHANGE THIS!

// ========================================
// 📍 URL RESOLVER
// ========================================

/**
 * Gets the appropriate base URL based on ACTIVE_ENV setting
 */
function getBaseUrl(): string {
  console.log(`🎯 Active Environment: ${ACTIVE_ENV}`);

  // If LOCAL is selected and we're in dev mode, auto-detect
  if (ACTIVE_ENV === "LOCAL" && __DEV__) {
    const debuggerHost = Constants.expoConfig?.hostUri?.split(":")[0];
    if (debuggerHost) {
      const localUrl = `http://${debuggerHost}:5000/api`;
      console.log("🔧 Using auto-detected local URL:", localUrl);
      return localUrl;
    }
    // Fallback for local dev
    console.log("🔧 Using localhost fallback");
    return "http://localhost:5000/api";
  }

  // If LOCAL is selected but we're in production build, warn and use production
  if (ACTIVE_ENV === "LOCAL" && !__DEV__) {
    console.warn(
      "⚠️ LOCAL env selected in production build! Using PRODUCTION URL instead."
    );
    return API_URLS.PRODUCTION;
  }

  // Use the selected environment URL
  const selectedUrl = API_URLS[ACTIVE_ENV];
  console.log(`🌐 Using ${ACTIVE_ENV} URL:`, selectedUrl);
  return selectedUrl;
}

// Priority: Environment variable from eas.json overrides everything
const ENV_OVERRIDE = process.env.EXPO_PUBLIC_BASE_URL;
const BASE_URL = ENV_OVERRIDE || getBaseUrl();

// Determine build type
const getBuildType = () => {
  if (ENV_OVERRIDE) return "EAS Build (preview/production)";
  if (__DEV__) return "Local Development";
  return "Manual Build";
};

// Log configuration on startup
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("📍 API Configuration");
console.log("   Build Type:", getBuildType());
console.log("   Environment:", ACTIVE_ENV);
console.log("   Base URL:", BASE_URL);
console.log("   Dev Mode:", __DEV__);
if (ENV_OVERRIDE) {
  console.log("   ✅ Using EAS env variable");
}
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

// ========================================
// 🔌 AXIOS INSTANCES
// ========================================

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

// ========================================
// 🔐 TOKEN MANAGEMENT
// ========================================

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

// ========================================
// 🔒 REQUEST INTERCEPTOR
// ========================================

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

// ========================================
// 📥 RESPONSE INTERCEPTOR
// ========================================

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
