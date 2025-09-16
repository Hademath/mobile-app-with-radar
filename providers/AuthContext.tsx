import AuthEndpoints from "@/endpoints/authEndpoints";
import useDataMutation from "@/hooks/useEndpointMutation";
import { loginType } from "@/schemas/login";
import { IUser } from "@/utils/types";
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
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  logout: () => void;
  login: (val: loginType) => void;
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
  const [user, setUser] = useState<IUser | null>(null);
  const queryClient = useQueryClient();

  const API = new AuthEndpoints();
  async function checkIfLoggedIn() { 
    const user = await AsyncStorage.getItem("user");

    if (user) {
      setIsLoggedIn(true);
      setUser(JSON.parse(user));
      setIsProcessing(false);
      router.replace("/(tabs)/Index");
    } else {
      setIsLoggedIn(false);
      setUser(null);
      setIsProcessing(false); 

      // router.replace("/");
      router.replace("/(auth)/Login/LoginScreen"); 
    }
  }
  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const { mutate, isPending } = useDataMutation({
    mutationKey: ["user login"],
    mutationFn: API.login,
  });

  async function setUserOnLogin(val: IUser) {
    await AsyncStorage.setItem("user", JSON.stringify(val));
    await AsyncStorage.setItem("account-exists", JSON.stringify(true));
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
        // console.log(res.data.message,  res?.data?.data);
        if (res?.data?.data.token) {
          setUserOnLogin(res?.data?.data);
          checkIfLoggedIn();
          alert(res.data.message);
        }
      },
      onError: (err:any) => {
        // console.log("❌ Login error:", err.response?.data || err.message);
          const msg = err?.response?.data?.message || err.message || "Failed to register user. Please try again.";
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
