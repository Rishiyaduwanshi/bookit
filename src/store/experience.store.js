'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useExperienceStore = create(
  persist(
    (set, get) => ({
      cache: {},
      listCache: null,
      listTimestamp: null,

      CACHE_DURATION: 5 * 60 * 1000,
      getExperiencesList: () => {
        const { listCache, listTimestamp, CACHE_DURATION } = get();

        if (!listCache || !listTimestamp) return null;

        const now = Date.now();
        if (now - listTimestamp > CACHE_DURATION) {
          return null;
        }

        return listCache;
      },

      setExperiencesList: data => {
        set({
          listCache: data,
          listTimestamp: Date.now(),
        });
      },

      getExperience: id => {
        const { cache, CACHE_DURATION } = get();
        const cached = cache[id];

        if (!cached) return null;

        const now = Date.now();
        if (now - cached.timestamp > CACHE_DURATION) {
          return null;
        }

        return cached.data;
      },

      setExperience: (id, data) => {
        set(state => ({
          cache: {
            ...state.cache,
            [id]: {
              data,
              timestamp: Date.now(),
            },
          },
        }));
      },

      clearCache: () => {
        set({ cache: {}, listCache: null, listTimestamp: null });
      },

      clearExperience: id => {
        set(state => {
          const newCache = { ...state.cache };
          delete newCache[id];
          return { cache: newCache };
        });
      },
    }),
    {
      name: 'experience-cache',
      partialize: state => ({
        cache: state.cache,
        listCache: state.listCache,
        listTimestamp: state.listTimestamp,
      }),
    }
  )
);

export default useExperienceStore;
