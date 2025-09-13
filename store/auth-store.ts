import AuthEndpoints from "@/endpoints/authEndpoints";
import useDataMutation from "@/hooks/useEndpointMutation";
import { IUser } from "@/utils/types";
import { create } from "zustand";


type Store = {
  user: IUser | null;
  loading: boolean;
  setUser: (user: IUser) => void;
  setLoading: (state: boolean) => void;
};

export const useAuthStore = create<Store>()((set) => ({
  loading: true,
  setLoading: (loading) => set({ loading }),
  user: null,
  setUser: (user) => set({ user }),
}));

export const useAuthActions = () => {
  const API = new AuthEndpoints();

  const checkLoginStatus = async () => {
    try {
      const user = true;
      // const user = await AsyncStorage.getItem("user");
      if (user) {
        // setUser(JSON.parse(user));
      }
    } catch (error) {
      console.error("Error checking login status", error);
    } finally {
    }
  };

  const { mutate, isPending } = useDataMutation({
    mutationKey: ["login user"],
    mutationFn: API.login,
  });

  return {
    checkLoginStatus,
    login: mutate,
    isLoggingIn: isPending,
  };
};
