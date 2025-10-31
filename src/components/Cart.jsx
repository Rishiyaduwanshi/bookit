'use client';
import useBookingStore from '@/store/booking.store';
import useCartStore from '@/store/cart.store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import api from '@/api';
import { useToast } from '@/context/toastContext';

export default function ({ goTo = '', dateAndTimeSelected = '' }) {
  const {
    price,
    taxes,
    discount,
    quantity,
    setQuantity,
    subTotal,
    total,
    promocode,
  } = useCartStore();

  const { date, time, slotId, name, email, experienceName, termsAccepted, setBookingId } = useBookingStore();
  const router = useRouter();
  const { showError, showSuccess } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleDecrement() {
    if (quantity > 1) return setQuantity(quantity - 1);
  }

  async function handleConfirm(e) {
    e.preventDefault();

    if (goTo === '/confirm') {
      if (!name || !email) {
        showError('Please fill in your name and email');
        return;
      }
      if (!slotId) {
        showError('Please select a time slot');
        return;
      }
      if (!termsAccepted) {
        showError('Please accept the terms and safety policy');
        return;
      }

      try {
        setIsSubmitting(true);
        const bookingData = {
          name,
          email,
          slotId,
          quantity,
        };

        if (promocode) {
          bookingData.promocode = promocode;
        }

        const response = await api.post('/bookings', bookingData);
        showSuccess(response.data.message || 'Booking confirmed successfully!');
        
        // Save booking ID and redirect with it
        const bookingId = response.data.data.booking._id;
        setBookingId(bookingId);
        router.push(`/confirm?bookingId=${bookingId}`);
      } catch (error) {
        showError(error.response?.data?.message || 'Failed to create booking');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      if (!(date && time)) return;
      router.push(goTo);
    }
  }

  return (
    <dl className="cart w-full lg:flex-1 mb-auto hd-bg-tertiary p-4 sm:p-5 rounded-lg text-sm sm:text-base">
      <div className="top flex flex-col justify-center gap-2 w-full">
        {experienceName && (
          <div className="flex justify-between">
            <dt>Experience</dt>
            <dd>{experienceName}</dd>
          </div>
        )}

        <div className="flex justify-between">
          <dt>Starts at</dt>
          <dd>{price}</dd>
        </div>

        {date && (
          <div className="flex justify-between">
            <dt>Date</dt>
            <dd className="text-right wrap-break-word">{date}</dd>
          </div>
        )}

        {time && (
          <div className="flex justify-between">
            <dt>Time</dt>
            <dd className="text-right wrap-break-word">{time}</dd>
          </div>
        )}
        <div className="flex justify-between items-center">
          <dt>Quantity</dt>
          <span className="quantifier">
            <span
              className={dateAndTimeSelected === 'selected' ? 'hidden!' : ''}
              onClick={handleDecrement}
            >
              -
            </span>
            <dd>{quantity}</dd>
            <span
              className={dateAndTimeSelected === 'selected' ? 'hidden!' : ''}
              onClick={() => setQuantity(quantity + 1)}
            >
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
        <button
          onClick={handleConfirm}
          disabled={
            isSubmitting ||
            (goTo === '/confirm' && (!name || !email || !slotId || !termsAccepted))
          }
          className={`confirm-btn text-center block rounded-md bg-amber-300 w-full mt-4 text-sm sm:text-base ${
            (!(date && time) ||
              isSubmitting ||
              (goTo === '/confirm' && (!name || !email || !slotId || !termsAccepted))) &&
            'muted'
          }`}
        >
          {isSubmitting
            ? 'Processing...'
            : goTo === '/confirm'
            ? 'Pay and Confirm'
            : 'Confirm'}
        </button>
      </div>
    </dl>
  );
}
