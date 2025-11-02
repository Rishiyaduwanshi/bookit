import { createHmac } from 'node:crypto';
import Razorpay from 'razorpay';
import { config } from '../../config/index.js';
import { BadRequestError } from '../utils/appError.js';

const razor = new Razorpay({
  key_id: config.RAZORPAY_KEY_ID,
  key_secret: config.RAZORPAY_KEY_SECRET,
});

export async function createRazorpayOrder(amount, receiptId) {
  try {
    if (!amount || Number.isNaN(amount) || amount <= 0) {
      throw new BadRequestError('Invalid amount provided for payment.');
    }

    const options = {
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: receiptId,
      payment_capture: 1,
    };

    const order = await razor.orders.create(options);
    return order;
  } catch (err) {
    console.error('Error creating Razorpay order:', err);
    throw err;
  }
}

/**
 * Verify Razorpay payment signature
 * @param {string} razorpay_order_id - Razorpay order ID
 * @param {string} razorpay_payment_id - Razorpay payment ID
 * @param {string} razorpay_signature - Signature from Razorpay
 * @returns {boolean} true if signature valid, otherwise throws error
 */

export function verifyRazorpaySignature(
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature
) {
  try {
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      throw new BadRequestError('Missing Razorpay verification parameters.');
    }

    const generatedSignature = createHmac('sha256', config.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      throw new BadRequestError('Invalid Razorpay signature.');
    }

    return true;
  } catch (err) {
    console.error('❌ Razorpay signature verification failed:', err.message);
    throw err;
  }
}
