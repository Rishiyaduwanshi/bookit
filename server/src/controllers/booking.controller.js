import Booking from '../models/booking.model.js';
import { createRazorpayOrder } from '../services/razorpay.service.js';
import Experience from '../models/experiences.model.js';
import Slot from '../models/slot.model.js';
import PromoCode from '../models/promocode.model.js';
import {
  BadRequestError,
  NotFoundError,
  GoneError,
} from '../utils/appError.js';
import appResponse from '../utils/appResponse.js';
import { config } from '../../config/index.js';

export async function bookExperience(req, res, next) {
  try {
    const { name, email, slotId, quantity, promocode } = req.body;

    if (!name || !email) {
      throw new BadRequestError('Name and email are required.');
    }

    if (!slotId) {
      throw new BadRequestError('Slot ID is required.');
    }

    if (!quantity || quantity <= 0) {
      throw new BadRequestError('Quantity must be at least 1.');
    }

    const slotData = await Slot.findById(slotId);
    if (!slotData) throw new NotFoundError('Slot not found.');

    const availableSeats = slotData.totalSeats - slotData.bookedSeats;
    if (quantity > availableSeats) {
      throw new BadRequestError(`Only ${availableSeats} seats available.`);
    }

    let appliedPromo = null;
    if (promocode) {
      const promo = await PromoCode.findOne({ code: promocode.toUpperCase() });
      if (!promo) throw new NotFoundError('Invalid promo code.');
      if (!promo.isActive)
        throw new BadRequestError('Promo code is not active.');
      if (promo.validTill < new Date())
        throw new GoneError('Promo code has expired.');

      appliedPromo = promo;
    }

    slotData.bookedSeats += quantity;

    const experienceData = await Experience.findById(slotData.experienceId);

    await slotData.save();

    //TotalAmount calculation
    const { tax, price } = experienceData;
    let totalAmount = price * quantity + tax;
    if (appliedPromo) {
      const discount = (totalAmount * appliedPromo.discountPercentage) / 100;
      totalAmount -= discount;
    }

    const booking = await Booking.create({
      name,
      email,
      slot: slotData._id,
      quantity,
      promocode: appliedPromo ? appliedPromo._id : null,
      status: 'pending',
    });

    const razorOrder = await createRazorpayOrder(
      totalAmount,
      `booking_${booking._id}`
    );

    booking.razorOrderId = razorOrder.id;
    await booking.save();

    return appResponse(res, {
      message: 'Booking initiated, proceed to payment',
      statusCode: 201,
      data: {
        bookingId: booking._id,
        razorId: razorOrder.id,
        receipt: razorOrder.receipt,
        razorKey: config.RAZORPAY_KEY_ID,
        amount: totalAmount,
        appliedPromo: appliedPromo
          ? {
              code: appliedPromo.code,
              discountPercentage: appliedPromo.discountPercentage,
            }
          : null,
      },
    });
  } catch (error) {
    next(error);
  }
}
