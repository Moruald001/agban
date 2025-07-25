// authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useClientStore = create(
  persist(
    (set) => ({
      list: [],

      create: (list) => set((state) => ({ ...list, state })),
      remove: () => {
        set({ list: null });
      },
    }),
    {
      name: "user-list", // clé dans localStorage
      getStorage: () => localStorage,
    }
  )
);

export default useClientStore;
