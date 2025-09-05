import AuthEndpoints from "@/endpoints/authEndpoints";
import useDataMutation from "@/hooks/useEndpointMutation";
import { create } from "zustand";

interface IUser {
  access_token: string;
  token_type: string;
  expires_in: number;
  data: {
    id: number;
    uuid: string;
    firstName: string;
    lastName: string;
    email: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
}
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
