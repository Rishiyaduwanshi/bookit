'use client';
import { useEffect } from 'react';
import useCartStore from '@/store/cart.store';

export default function () {
  const { price, taxes, discount, quantity, setQuantity, subTotal, total } = useCartStore();

  function handleDecrement() {
    if (quantity > 0) return setQuantity(quantity - 1);
  }

  return (
    <dl className="cart flex-1 mb-auto hd-bg-tertiary p-5 rounded-lg">
      <div className="top flex flex-col justify-center gap-2 w-full">
        <div className="flex justify-between">
          <dt>Starts at</dt>
          <dd>{price}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Quantity</dt>
          <span className="quantifier">
            <span className="" onClick={handleDecrement}>
              -
            </span>
            <dd>{quantity}</dd>
            <span className="" onClick={() => setQuantity(quantity + 1)}>
              +
            </span>
          </span>
        </div>
        <div className="flex justify-between">
          <dt>Subtotal</dt>
          <dd>&#8377;{subTotal}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Taxes</dt>
          <dd>&#8377;{taxes}</dd>
        </div>
        {discount > 0 && (
          <div className="flex justify-between">
            <dt>Discount</dt>
            <dd>&#8377;{discount}</dd>
          </div>
        )}
        <div className="flex justify-between border-t border-t-gray-500 pt-2 font-bold">
          <dt>Total</dt>
          <dd>&#8377;{total}</dd>
        </div>
      </div>
      <div className="bottom">
        <button className="confirm-btn w-full mt-4 ">Confirm</button>
      </div>
    </dl>
  );
}
