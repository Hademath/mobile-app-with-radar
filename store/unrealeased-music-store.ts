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
    metaData?: any;
    externalPlatform?: string
  };
}

interface unnrealeaseFunc {
  setData: (data: unrealeasedMusicData["data"]) => void;
  updateData: (params: Partial<unrealeasedMusicData["data"]>) => void;
}

type musicStoreType = unrealeasedMusicData & unnrealeaseFunc;

const musicStore = create<musicStoreType>()((set) => ({
  data: {
    musicType: "",
    song: "",
    title: "",
    upload_as: "",
    genre: "",
    genreImage: null,
    genreName: "",
    metaData: {},
    externalPlatform :""
  },

  setData: (val) => set({ data: val }),
  updateData: (val) =>
    set((state) => ({
      ...state,
      data: { ...state.data, ...val },
    })),
}));

export default musicStore;
