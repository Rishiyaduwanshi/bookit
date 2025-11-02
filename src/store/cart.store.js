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
    const discountAmount =
      ((newSubtotal + tax) * (discountPercentage || 0)) / 100;
    const newTotal = Math.max(0, newSubtotal + tax - discountAmount);
    set({
      price: price,
      taxes: tax,
      subTotal: newSubtotal,
      discount: Math.round(discountAmount),
      total: Math.round(newTotal),
    });
  },

  setQuantity: qty => {
    const { price, taxes, discountPercentage } = get();
    const newSubtotal = price * qty;
    const discountAmount =
      ((newSubtotal + taxes) * (discountPercentage || 0)) / 100;
    const newTotal = Math.max(0, newSubtotal + taxes - discountAmount);
    set({
      quantity: qty,
      subTotal: newSubtotal,
      discount: Math.round(discountAmount),
      total: Math.round(newTotal),
    });
  },

  setDiscount: d => {
    set({ discount: d });
  },

  applyDiscount: (discountPercentage, promocodeId, promocode) => {
    const { subTotal, taxes } = get();
    const validPercentage = discountPercentage || 0;
    const discountAmount = ((subTotal + taxes) * validPercentage) / 100;
    const newTotal = Math.max(0, subTotal + taxes - discountAmount);
    set({
      discountPercentage: validPercentage,
      discount: Math.round(discountAmount),
      total: Math.round(newTotal),
      promocodeId: promocodeId,
      promocode: promocode,
    });
  },
}));

export default useCartStore;
