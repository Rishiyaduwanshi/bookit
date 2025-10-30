'use client';
import api from '@/ui/api';
import { useCallback, useState } from 'react';
import { useToast } from '@/context/toastContext';
import useCartStore from '@/store/cart.store';

const Checkout = () => {
  const [promocode, setPromocode] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const { showError, showSuccess, showWarning } = useToast();
  const { applyDiscount } = useCartStore();

  const handleApplyPromo = useCallback(async () => {
    try {
      if (promocode.length < 3) {
        showWarning('The code you entered does not exists');
        return;
      }
      setIsApplying(true);
      const resp = await api.post('/promo/validate', {
        promocode,
      });
      showSuccess(resp.data.message);
      applyDiscount(resp.data.data.discount);
    } catch (error) {
      showError(error.response.data.message);
    } finally {
      setTimeout(() => {
        setIsApplying(false);
      }, 1500);
    }
  }, [promocode]);

  return (
    <div className="flex flex-3 flex-col gap-3 bg-gray-200 px-6 pt-6 rounded-lg">
      <div className="flex gap-4 w-full">
        <div className="flex flex-col flex-1 gap-1">
          <label htmlFor="name">Full name</label>
          <input type="text" name="" id="name" placeholder="Your name" />
        </div>
        <div className="flex flex-col flex-1 gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name=""
            className="text-black"
            placeholder="Your email"
            id="email"
          />
        </div>
      </div>
      <div className="flex gap-4">
        <input
          onChange={(e) => setPromocode(e.target.value.trim().toUpperCase())}
          type="text"
          placeholder="Promo code"
          className="py-2 w-[90%]"
          value={promocode}
        />
        <span
          onClick={handleApplyPromo}
          className={` ${
            isApplying ? 'muted' : ''
          }  px-3 py-2 flex-1 rounded-md cursor-pointer text-center bg-black text-amber-100 `}
        >
          Apply
        </span>
      </div>
      <div className="flex gap-2 mt-1">
        <input
          type="checkbox"
          name="tnc"
          id="tnc"
          className="cursor-pointer bg-black"
        />
        <label htmlFor="tnc" className="text-gray-600">
          I agree to the terms and safety policy
        </label>
      </div>
    </div>
  );
};

export default Checkout;
