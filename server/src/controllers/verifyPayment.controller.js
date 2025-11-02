import Booking from '../models/booking.model.js';
import Slot from '../models/slot.model.js';
import { verifyRazorpaySignature } from '../services/razorpay.service.js';
import { BadRequestError, NotFoundError } from '../utils/appError.js';
import appResponse from '../utils/appResponse.js';

export async function verifyPayment(req, res, next) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const isPaymentVerified = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isPaymentVerified) {
      throw new BadRequestError('Payment verification failed.');
    }

    const booking = await Booking.findOne({
      razorOrderId: razorpay_order_id,
    });

    if (!booking) {
      throw new NotFoundError('Booking not found for this order.');
    }

    // Check if booking is already confirmed
    if (booking.status === 'confirmed') {
      return appResponse(res, {
        statusCode: 200,
        message: 'Payment already verified.',
        data: { bookingId: booking._id },
      });
    }

    // Get slot data and verify seats are still available
    const slotData = await Slot.findById(booking.slot);
    if (!slotData) {
      throw new NotFoundError('Slot not found.');
    }

    const availableSeats = slotData.totalSeats - slotData.bookedSeats;
    if (booking.quantity > availableSeats) {
      // Refund needed - seats no longer available
      booking.status = 'failed';
      await booking.save();
      throw new BadRequestError(
        `Only ${availableSeats} seats available. Booking cancelled. Refund will be processed.`
      );
    }

    // NOW book the seats after payment verification
    slotData.bookedSeats += booking.quantity;
    await slotData.save();

    // Update booking status
    booking.status = 'confirmed';
    booking.razorPaymentId = razorpay_payment_id;
    await booking.save();

    return appResponse(res, {
      statusCode: 200,
      message: 'Payment verified successfully.',
      data: { bookingId: booking._id },
    });
  } catch (error) {
    next(error);
  }
}
