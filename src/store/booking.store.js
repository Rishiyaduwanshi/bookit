'use client';
import { create } from 'zustand';

const useBookingStore = create((set, get) => ({
  date: '',
  time: '',
  slotId: ' ',

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

  setSlotId: (slotId) => {
    
  },
}));

export default useBookingStore;
