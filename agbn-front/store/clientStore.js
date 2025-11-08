// authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useClientStore = create(
  persist(
    (set) => ({
      lists: [],
      latestList: [],

      create: (newList) => set((state) => ({ lists: newList })),
      createLatestList: (newLatestList) =>
        set((state) => ({ latestList: newLatestList })),

      remove: () => {
        set({ lists: [], latestList: [] });
      },
    }),
    {
      name: "user-list", // clé dans localStorage
      getStorage: () => localStorage,
    }
  )
);

export default useClientStore;
