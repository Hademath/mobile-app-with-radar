import AuthEndpoints from "@/endpoints/authEndpoints";
import useDataMutation from "@/hooks/useEndpointMutation";
import { loginType } from "@/schemas/loginSchema";
import { IUserData } from "@/utils/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import {
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

  const API = new AuthEndpoints();

async function checkIfLoggedIn() {
  const stored = await AsyncStorage.getItem("user");

  if (stored) {
    const parsed: IUserData = JSON.parse(stored);
      setIsLoggedIn(true);
      setUser(parsed);
      setIsProcessing(false);

      // optional: you can refresh silently in background
      refreshUser();
      router.replace("/(tabs)/Index");
  } else {
      setIsLoggedIn(false);
      setUser(null);
      setIsProcessing(false);
      router.replace("/(auth)/Login/LoginScreen");
  }
}

  // refresh User function
async function refreshUser() {
  try {
    const res = await API.getUserProfile();
    const freshUser: IUserData = res.data.user;
    // console.log("Refreshed user:", freshUser);

    if (freshUser) {
      setUser(freshUser);
      await AsyncStorage.setItem("user", JSON.stringify(freshUser));
    }
  } catch (err: any) {
    console.error(
      "❌ Failed to refresh user",
      err.response?.data || err.message
    );
  }
}
  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const { mutate, isPending } = useDataMutation({
    mutationKey: ["user login"],
    mutationFn: API.login,
  });

async function setUserOnLogin(val: IUserData) {
    await AsyncStorage.setItem("user", JSON.stringify(val));
    await AsyncStorage.setItem("account-exists", JSON.stringify(true));
    setUser(val);
    setIsLoggedIn(true);
}
  async function logout() {
    queryClient.clear();
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("account-exists");
    checkIfLoggedIn();
  }

async function login(val: loginType) {
    mutate(val, {
      onSuccess: (res) => {
        const loginData: IUserData = res.data.data;
        if (loginData.token) {
          setUserOnLogin(loginData);
          router.replace("/(tabs)/Index"); 
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
        refreshUser, // 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
