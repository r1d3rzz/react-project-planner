import { create } from "zustand";

const useIsSubmit = create((set) => ({
  isSubmit: false,
  setIsSubmit: (isSubmit) => set({ isSubmit }),
}));

export default useIsSubmit;
