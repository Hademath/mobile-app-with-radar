import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { router } from "expo-router";
import Constants from "expo-constants";

let cachedToken: string | null = null;

// ========================================
// 🔧 ENVIRONMENT CONFIGURATION
// ========================================

const API_URLS = {
  LOCAL: "auto-detect",
  PRODUCTION: "https://artisteradar-user-api-vd39o.ondigitalocean.app/api",
};

// ⚙️ Change this to switch between LOCAL and PRODUCTION
const ACTIVE_ENV: "LOCAL" | "PRODUCTION" = "LOCAL";

// ========================================
// 📍 URL RESOLVER
// ========================================

function getBaseUrl(): string {
  console.log(`🎯 Active Environment: ${ACTIVE_ENV}`);

  if (ACTIVE_ENV === "LOCAL" && __DEV__) {
    const debuggerHost = Constants.expoConfig?.hostUri?.split(":")[0];
    if (debuggerHost) {
      const localUrl = `http://${debuggerHost}:5000/api`;
      console.log("🔧 Using auto-detected local URL:", localUrl);
      return localUrl;
    }
    console.log("🔧 Using localhost fallback");
    return "http://localhost:5000/api";
  }

  if (ACTIVE_ENV === "LOCAL" && !__DEV__) {
    console.warn(
      "⚠️ LOCAL env selected in production build! Using PRODUCTION URL instead."
    );
    return API_URLS.PRODUCTION;
  }

  const selectedUrl = API_URLS[ACTIVE_ENV];
  console.log(`🌐 Using ${ACTIVE_ENV} URL:`, selectedUrl);
  return selectedUrl;
}

// Priority: Environment variable from .env overrides everything
const ENV_OVERRIDE = process.env.EXPO_PUBLIC_BASE_URL;
const BASE_URL = ENV_OVERRIDE || getBaseUrl();

// Determine build type
const getBuildType = () => {
  if (ENV_OVERRIDE) return "Environment Variable (.env or EAS)";
  if (__DEV__) return "Local Development (auto-detect)";
  return "Manual Build";
};

// Enhanced logging
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("📍 API Configuration");
console.log("   Build Type:", getBuildType());
console.log("   Environment:", ACTIVE_ENV);
console.log("   Base URL:", BASE_URL);
console.log("   Dev Mode:", __DEV__);
console.log("   Debugger Host:", Constants.expoConfig?.hostUri);
if (ENV_OVERRIDE) {
  console.log("   ✅ Using EXPO_PUBLIC_BASE_URL:", ENV_OVERRIDE);
} else {
  console.log("   ℹ️ No EXPO_PUBLIC_BASE_URL found, using", ACTIVE_ENV);
}
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

// ========================================
// 🔌 AXIOS INSTANCES
// ========================================

const baseInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

const authInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 300000, // 5 minutes for uploads
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
    console.log(`📤 Request: ${config.method?.toUpperCase()} ${config.url}`);

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
    console.error("❌ Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// ========================================
// 📥 RESPONSE INTERCEPTOR
// ========================================

// Add base instance interceptor for debugging
baseInstance.interceptors.response.use(
  (response) => {
    console.log(`✅ Response: ${response.config.url} - ${response.status}`);
    return response;
  },
  (error) => {
    console.error("❌ Base Instance Error:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

authInstance.interceptors.response.use(
  (response) => {
    console.log(`✅ Response: ${response.config.url} - ${response.status}`);
    return response;
  },
  (error) => {
    console.error("❌ Auth Instance Error:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data,
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
