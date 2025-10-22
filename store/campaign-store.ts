import { create } from "zustand";
import { unrealeasedMusicData } from "./unrealeased-music-store";
import { SongMetadata } from "@/types/musicTypes";
interface PromptOption {
  option: string;
}
interface Prompt {
  question: string;
  allow_multiple_choice: boolean;
  options: PromptOption[];
}

interface campaignData {
  data: {
    music: unrealeasedMusicData["data"];
    musicMetadata?: SongMetadata;
    uuid?: string;
    targetAudience: string;
    duration: number | null;
    ageGroup: string;
    estimated_reach: { min: number | null; max: number | null };
    fixed_prompt?: string;
    prompts?: Prompt[];
  };
}

interface campaignFunc {
  setData: (data: campaignData["data"]) => void;
  updateData: (params: Partial<campaignData["data"]>) => void;
}

type store = campaignData & campaignFunc;

const campaignStore = create<store>()((set) => ({
  data: {
    uuid : "",
    targetAudience: "",
    duration: null,
    ageGroup: "",
    estimated_reach: { min: null, max: null },
    
    music: {
      uuid : "",
      musicType: "",
      song: "",
      title: "",
      upload_as: "",
      genre: "",
      genreImage: null,
      genreName: "",
    },  
    musicMetadata: undefined,
    fixed_prompt: "",
    prompts: [],
  },

  setData: (val) => set({ data: val }),
  updateData: (val) =>
    set((state) => ({
      ...state,
      data: { ...state.data, ...val },
    })),
}));

export default campaignStore;
