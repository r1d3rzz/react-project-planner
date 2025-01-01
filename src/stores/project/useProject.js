import { create } from "zustand";

const useProject = create((set) => ({
  projects: [],
  getProjects: async () => {
    const res = await fetch(import.meta.env.VITE_API_URL + "/projects");
    const data = await res.json();
    set({ projects: data });
  },
}));

export default useProject;
