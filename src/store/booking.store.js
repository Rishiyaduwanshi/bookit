'use client';
import { create } from 'zustand';

const useBookingStore = create((set, get) => ({
  date: '',
  time: '',

  setDate: (dt) => {
    set({
      date: dt,
    });
  },

  setTime: (time) => {
    set({
      time,
    });
  },
}));

export default useBookingStore;
