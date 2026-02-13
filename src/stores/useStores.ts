import { create } from "zustand";

interface AppState {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  isNavOpen: boolean;
  toggleNav: () => void;
  closeNav: () => void;

  cursorVariant: "default" | "hover" | "click";
  setCursorVariant: (variant: "default" | "hover" | "click") => void;
}

export const useStore = create<AppState>((set) => ({
  isLoading: true,
  setIsLoading: (loading) => set({ isLoading: loading }),

  isNavOpen: false,
  toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen })),
  closeNav: () => set({ isNavOpen: false }),

  cursorVariant: "default",
  setCursorVariant: (variant) => set({ cursorVariant: variant }),
}));
