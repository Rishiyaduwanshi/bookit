'use client';
import { create } from 'zustand';

const useExperienceStore = create((set, get) => ({
  cache: {},

  CACHE_DURATION: 5 * 60 * 1000,

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
    set({ cache: {} });
  },

  clearExperience: id => {
    set(state => {
      const newCache = { ...state.cache };
      delete newCache[id];
      return { cache: newCache };
    });
  },
}));

export default useExperienceStore;
