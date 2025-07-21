// authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: {},
      isAuthenticated: false,

      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => {
        set({ user: null, isAuthenticated: false }),
          (window.location.href = "/");
      },
      clearUsers: () => set({ users: {} }),
    }),
    {
      name: "user-storage", // clé dans localStorage
      getStorage: () => localStorage, // ou sessionStorage
    }
  )
);

export default useAuthStore;
