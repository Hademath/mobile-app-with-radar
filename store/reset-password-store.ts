import { create } from "zustand";

interface resetPassData {
  data: {
    email: string;
    token: string;
    newpassword: string;
    confirmPassword: string;
  };
}

interface resetFunc {
  setData: (data: resetPassData["data"]) => void;
  updateData: (params: Partial<resetPassData["data"]>) => void;
 
}

type setStore = resetPassData & resetFunc;

const useResetPassStore = create<setStore>()((set) => ({
  data: {
    email: "",
    token: "",
    newpassword: "",
    confirmPassword: "",
  },
  setData: (val) => set({ data: val }),
  updateData: (val) =>
    set((state) => ({
      ...state,
      data: { ...state.data, ...val },
    })),
}));

export default useResetPassStore;
