import { verifyRazorpaySignature } from '../services/razorpay.service.js';
import Booking from '../models/booking.model.js';
import appResponse from '../utils/appResponse.js';
import { NotFoundError } from '../utils/appError.js';

export async function verifyPayment(req, res, next) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const isPaymentVerified = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );
    let booking;
    if (isPaymentVerified) {
      booking = await Booking.findOne({
        razorOrderId: razorpay_order_id,
      });
      if (!booking)
        throw new NotFoundError('Booking not found for this order.');

      booking.status = 'confirmed';
      booking.razorPaymentId = razorpay_payment_id;
      await booking.save();
    }

    return appResponse(res, {
      statusCode: 200,
      message: 'Payment verified successfully.',
      data: { bookingId: booking._id },
    });
  } catch (error) {
    next(error);
  }
}
