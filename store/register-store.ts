
import { create } from "zustand";

interface registerData {
  data: {
      firstName: string;
      lastName: string;
      username: string;
      email: string;
      password: string;
      dateOfBirth: Date;
      country: string;
      city: string;
      state: string;
      avatar: string;
      gender: string;
      role?: string;
      otp?: string;
  };
}

interface registerFunc {
  setData: (data: registerData["data"]) => void;
  updateData: (params: Partial<registerData["data"]>) => void;
 
}

type registerStore = registerData & registerFunc;

const useRegisterStore = create<registerStore>()((set) => ({
  data: {
      email: "",
      firstName: "",
      username: "",
      password: "",
      dateOfBirth: new Date(),
      country: "",
      state: "",
      city: "",
      lastName: "",
      gender: "",
      avatar: "",
  },
  setData: (val) => set({ data: val }),
  updateData: (val) =>
    set((state) => ({
      ...state,
      data: { ...state.data, ...val },
    })),
 
}));

export default useRegisterStore;
