// stores/audioStore.ts
import { create } from "zustand";

type AudioSelection = {
  start: number;
  end: number;
};

type AudioStore = {
  file: File | null;
  audioUrl: string;
  duration: number;
  currentTime: number;
  playing: boolean;
  selection: AudioSelection;

  // Actions
  setAudio: (file: File) => void;
  setDuration: (duration: number) => void;
  setCurrentTime: (time: number) => void;
  setPlaying: (playing: boolean) => void;
  setSelection: (start: number, end: number) => void;
  resetAudio: () => void;
};

export const useAudioStore = create<AudioStore>((set) => ({
  file: null,
  audioUrl: "",
  duration: 0,
  currentTime: 0,
  playing: false,
  selection: { start: 0, end: 0 },

  setAudio: (file) => {
    const url = URL.createObjectURL(file);
    set({ file, audioUrl: url });
  },

  setDuration: (duration) => set({ duration }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setPlaying: (playing) => set({ playing }),
  setSelection: (start, end) => set({ selection: { start, end } }),

  resetAudio: () =>
    set({
      file: null,
      audioUrl: "",
      duration: 0,
      currentTime: 0,
      playing: false,
      selection: { start: 0, end: 0 },
    }),
}));
