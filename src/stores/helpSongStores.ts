import { create } from "zustand";

type HelpSongStore = {
  songId: string | null;
  audioUrl: string;
  duration: number;
  currentTime: number;
  playing: boolean;

  setSong: (url: string, id: string) => void;
  setDuration: (duration: number) => void;
  setCurrentTime: (time: number) => void;
  setPlaying: (playing: boolean) => void;
  reset: () => void;
};

export const useHelpSongStore = create<HelpSongStore>((set) => ({
  songId: null,
  audioUrl: "",
  duration: 0,
  currentTime: 0,
  playing: false,

  setSong: (url, id) => set({ audioUrl: url, songId: id }),
  setDuration: (duration) => set({ duration }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setPlaying: (playing) => set({ playing }),
  reset: () =>
    set({
      songId: null,
      audioUrl: "",
      duration: 0,
      currentTime: 0,
      playing: false,
    }),
}));
