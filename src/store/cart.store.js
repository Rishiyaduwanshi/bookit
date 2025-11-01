'use client';
import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  price: 1000,
  quantity: 1,
  taxes: 200,
  discount: 0,
  discountPercentage: 0,
  subTotal: 1200,
  total: 1400,
  promocode: null,
  promocodeId: null,

  setCart: (price, tax) => {
    const { discountPercentage, quantity } = get();
    const newSubtotal = price * quantity;
    const discountAmount = ((newSubtotal + tax) * discountPercentage) / 100;
    const newTotal = Math.max(0, newSubtotal + tax - discountAmount);
    set({
      price: price,
      taxes: tax,
      subTotal: newSubtotal,
      discount: discountAmount,
      total: newTotal,
    });
  },

  setQuantity: (qty) => {
    const { price, taxes, discountPercentage } = get();
    const newSubtotal = price * qty;
    const discountAmount = ((newSubtotal + taxes) * discountPercentage) / 100;
    const newTotal = Math.max(0, newSubtotal + taxes - discountAmount);
    set({
      quantity: qty,
      subTotal: newSubtotal,
      discount: discountAmount,
      total: newTotal,
    });
  },

  setDiscount: (d) => {
    set({ discount: d });
  },

  applyDiscount: (discountPercentage, promocodeId, promocode) => {
    const { subTotal, taxes } = get();
    const discountAmount = ((subTotal + taxes) * discountPercentage) / 100;
    const newTotal = Math.max(0, subTotal + taxes - discountAmount);
    set({
      discountPercentage: discountPercentage,
      discount: discountAmount,
      total: newTotal,
      promocodeId: promocodeId,
      promocode: promocode,
    });
  },
}));

export default useCartStore;
