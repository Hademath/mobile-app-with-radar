
import { create } from "zustand";

interface setupData {
  data: {
      username: string;
      genres : string[];
      avatarType: string;
      profile: string | { uri: string; name: string; type: string };
      role: string;
      notification?: boolean;
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
        profile: "",
        role: "",
        notification: false,
  },
  setData: (val) => set({ data: val }),
  updateData: (val) =>
    set((state) => ({
      ...state,
      data: { ...state.data, ...val },
    })),
 
}));

export default useProfileSetupStore;
