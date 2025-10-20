import { create } from "zustand";

interface campaignData {
    data: {
    targetAudience: string;
    duration: number | null;
    ageGroup: string;
    estimated_reach: { min: number | null; max: number | null }
    music: object;
    campaign:object
  };
}

interface campaignFunc {
  setData: (data: campaignData["data"]) => void;
  updateData: (params: Partial<campaignData["data"]>) => void;
}

type store = campaignData & campaignFunc;

const campaignStore = create<store>()((set) => ({
  data: {
      targetAudience: "",
      duration: null,
      ageGroup: "", 
      estimated_reach: { min: null, max: null },
      music: {},
      campaign: {}
  },

  setData: (val) => set({ data: val }),
  updateData: (val) =>
    set((state) => ({
      ...state,
      data: { ...state.data, ...val },
    })),
}));

export default campaignStore;
