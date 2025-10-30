'use client';
import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  price: 1000,
  quantity: 1,
  taxes: 200,
  discount: 0,
  subTotal: 1200,
  total: 1400,

  setQuantity: (qty) => {
    const { price, taxes, discount } = get();
    const newSubtotal = price * qty;
    const newTotal = newSubtotal + taxes - discount;
    set({
      quantity: qty,
      subTotal: newSubtotal,
      total: newTotal,
    });
  },

  applyDiscount: (discount) => {
    const { subTotal, taxes } = get();
    const newTotal = subTotal + taxes - discount;
    set({
      discount: discount,
      total: newTotal,
    });
  },
}));

export default useCartStore