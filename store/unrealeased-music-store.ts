import { create } from "zustand";

export interface unrealeasedMusicData {
  data: {
    musicType?: string;
    song: string;
    title?: string;
    upload_as?: string;
    genre?: string;
    genreImage?: string | null;
    genreName?: string;
  };
}

interface unnrealeaseFunc {
  setData: (data: unrealeasedMusicData["data"]) => void;
  updateData: (params: Partial<unrealeasedMusicData["data"]>) => void;
}

type musicStore = unrealeasedMusicData & unnrealeaseFunc;

const unrealeasedMucStore = create<musicStore>()((set) => ({
  data: {
    musicType: "",
    song: "",
    title: "",
    upload_as: "",
    genre: "",
    genreImage: null,
    genreName: "",
  },

  setData: (val) => set({ data: val }),
  updateData: (val) =>
    set((state) => ({
      ...state,
      data: { ...state.data, ...val },
    })),
}));

export default unrealeasedMucStore;
