// authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useClientStore = create(
  persist(
    (set) => ({
      lists: null,
      latestList: null,

      create: (list) => set((state) => ({ ...list, state })),
      createLatestList: (latestList) =>
        set((state) => ({ ...latestList, state })),

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
