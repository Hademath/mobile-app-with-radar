import * as  AuthEndpoints from "@/endpoints/authEndpoints";
import useDataMutation from "@/hooks/useEndpointMutation";
import { loginType } from "@/schemas/loginSchema";
import { IUserData } from "@/types/userTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { setAuthToken, clearAuthToken } from "@/utils/apiService";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type ContextStore = {
  user: IUserData | null;
  setUser: React.Dispatch<React.SetStateAction<IUserData | null>>;
  logout: () => void;
  login: (val: loginType) => void;
  refreshUser: () => Promise<void>; //
  isPending: boolean;
  isLoggedIn: boolean;
  isProcessing: boolean;
};
 
const AuthContext = createContext({} as ContextStore);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthenticationProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProcessing, setIsProcessing] = useState(true);
  const [user, setUser] = useState<IUserData | null>(null);
  const queryClient = useQueryClient();

  async function setUserOnLogin(val: IUserData) {
    // console.log("Setting user on login, token:", val.token);
    await AsyncStorage.setItem("user", JSON.stringify(val));
    await AsyncStorage.setItem("account-exists", JSON.stringify(true));
    setAuthToken(val.token); 
    setUser(val);
    setIsLoggedIn(true);
  }


  async function logout() {
    clearAuthToken(); 
    queryClient.clear();
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("account-exists");
    checkIfLoggedIn();
  }

  async function checkIfLoggedIn() {
    const stored = await AsyncStorage.getItem("user");

    if (stored) {
      const parsed: IUserData = JSON.parse(stored);
      setAuthToken(parsed.token); 
      setIsLoggedIn(true);
      setUser(parsed);
      setIsProcessing(false);
      refreshUser();
      router.replace("/(tabs)/Home");
    } else {
      clearAuthToken(); // ✅ Ensure token is cleared
      setIsLoggedIn(false);
      setUser(null);
      setIsProcessing(false);
      router.replace("/(auth)/Login/LoginScreen");
    }
  }

async function refreshUser() {
  const stored = await AsyncStorage.getItem("user");
  if (!stored) {
    // console.log("No user data found, skipping refresh");
    return;
  }

  const userData: IUserData = JSON.parse(stored);
  if (!userData.token) {
    return;
  }

  try {
    const res = await AuthEndpoints.getUserProfile();
    const freshUserProfile = res.data.user; // This only has profile data, no token

    if (freshUserProfile) {
      // ✅ Merge the fresh profile data with the existing token
      const updatedUser: IUserData = {
        ...freshUserProfile,
        token: userData.token, // Keep the existing token!
      };

      setUser(updatedUser);
      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
      // ❌ Don't call setAuthToken here - the token is already cached from login
    }
  } catch (err: any) {
    console.error(
      "❌ Failed to refresh user",
      err.response?.data || err.message
    );

    if (err.response?.status === 403 || err.response?.status === 401) {
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("account-exists");
      clearAuthToken();
      setUser(null);
      setIsLoggedIn(false);
      queryClient.clear();
      router.replace("/(auth)/Login/LoginScreen");
    }
  }
}

  useEffect(() => {
    checkIfLoggedIn();  
  }, []);

  const { mutate, isPending } = useDataMutation({
    mutationKey: ["user login"],
    mutationFn: AuthEndpoints.login,
  });

async function login(val: loginType) {
    mutate(val, {
      onSuccess: (res) => {
        const loginData: IUserData = res.data.data;
        if (loginData.token) {
          setUserOnLogin(loginData);
          router.replace("/(tabs)/Home"); 
          alert(res.data.message);
        }
      },
      onError: (err: any) => {
        const msg =
          err?.response?.data?.message ||
          err.message ||
          "Failed to register user. Please try again.";
        alert(msg);
      },
    });
}

  // useEffect(() => {
  // 	if (response) {
  // 		if (response.data.access_token) {
  // 			setUserOnLogin(response.data);
  // 			checkIfLoggedIn();
  // 		}
  // 	}
  // }, [response]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isPending,
        isLoggedIn,
        login,
        logout,
        isProcessing,
        refreshUser, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
