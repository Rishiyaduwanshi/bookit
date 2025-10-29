'use client';
import { useEffect, useState } from 'react';

export default function ({ price = 987, taxes = 59 }) {
  const [quantity, setQuantity] = useState(1);
  const [subtotal, setSubtotal] = useState(price * quantity);
  const [total, setTotal] = useState(subtotal + taxes);

  function handleDecrement() {
    if (quantity > 0) return setQuantity(quantity - 1);
  }

  useEffect(() => {
    setSubtotal(price * quantity);
  }, [quantity]);

  useEffect(() => {
    setTotal(subtotal + taxes);
  }, [subtotal]);

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
          <dd>&#8377;{subtotal}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Taxes</dt>
          <dd>&#8377;{taxes}</dd>
        </div>
        <div className="flex justify-between border-t border-t-gray-500 pt-2 font-bold">
          <dt>Total</dt>
          <dd>&#8377;{total}</dd>
        </div>
      </div>
      <div className="bottom">
        <button className='confirm-btn w-full mt-4 '>Confirm</button>
      </div>
    </dl>
  );
}
