'use client';
import { create } from 'zustand';

const useBookingStore = create((set, get) => ({
  date: '',
  time: '',
  slotId: '',
  name: '',
  email: '',
  experienceName: '',

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
    set({
      slotId,
    });
  },

  setName: (name) => {
    set({
      name,
    });
  },

  setEmail: (email) => {
    set({
      email,
    });
  },

  setExperienceName: (experienceName) => {
    set({
      experienceName,
    });
  },
}));

export default useBookingStore;
