'use client';
import { create } from 'zustand';

const useBookingStore = create((set, get) => ({
  date: '',
  time: '',
  slotId: '',
  name: '',
  email: '',
  experienceName: '',
  bookingId: '',
  termsAccepted: false,

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

  setBookingId: (bookingId) => {
    set({
      bookingId,
    });
  },

  setTermsAccepted: (termsAccepted) => {
    set({
      termsAccepted,
    });
  },
}));

export default useBookingStore;
