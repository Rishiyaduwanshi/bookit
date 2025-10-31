'use client';
import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  price: 1000,
  quantity: 1,
  taxes: 200,
  discount: 0,
  subTotal: 1200,
  total: 1400,
  promocode: null,
  promocodeId: null,

  setCart: (price, tax) => {
    const { discount, quantity } = get();
    const newSubtotal = price * quantity;
    const newTotal = Math.max(0, newSubtotal + tax - discount);
    set({
      price: price,
      taxes: tax,
      subTotal: newSubtotal,
      total: newTotal,
    });
  },

  setQuantity: (qty) => {
    const { price, taxes, discount } = get();
    const newSubtotal = price * qty;
    const newTotal = Math.max(0, newSubtotal + taxes - discount);
    set({
      quantity: qty,
      subTotal: newSubtotal,
      total: newTotal,
    });
  },

  applyDiscount: (discount, promocodeId, promocode) => {
    const { subTotal, taxes } = get();
    // Ensure discount doesn't make total negative
    const maxDiscount = subTotal + taxes;
    const validDiscount = Math.min(discount, maxDiscount);
    const newTotal = Math.max(0, subTotal + taxes - validDiscount);
    set({
      discount: validDiscount,
      total: newTotal,
      promocodeId: promocodeId,
      promocode: promocode,
    });
  },
}));

export default useCartStore;
