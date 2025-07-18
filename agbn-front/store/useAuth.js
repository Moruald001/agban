// authStore.js
import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: {},
  isAuthenticated: false,

  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => {
    set({ user: null, isAuthenticated: false }), (window.location.href = "/");
  },
}));

export default useAuthStore;
