
import { create } from "zustand";

interface setupData {
  data: {
      username: string;
      genres : string[];
      avatarType?: string;
      avatar: string;
      role?: string;
      notifications?: boolean;
  };
}

interface profileFunc {
  setData: (data: setupData["data"]) => void;
  updateData: (params: Partial<setupData["data"]>) => void;
 
}

type setStore = setupData & profileFunc;

const useProfileSetupStore = create<setStore>()((set) => ({
  data: {
        username: "",
        genres: [],
        avatarType: "",
        avatar: "",
        role: "",
        notifications: true,
  },
  setData: (val) => set({ data: val }),
  updateData: (val) =>
    set((state) => ({
      ...state,
      data: { ...state.data, ...val },
    })),
 
}));

export default useProfileSetupStore;
