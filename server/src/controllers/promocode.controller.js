import promocodeModel from '../models/promocode.model.js';
import { GoneError, NotFoundError } from '../utils/appError.js';
import appResponse from '../utils/appResponse.js';

export async function validatePromocode(req, res, next) {
  try {
    const { promocode } = req.body;
    const foundPromocode = await promocodeModel.findOne({ code: promocode });
    if (!foundPromocode) throw new NotFoundError('Invalid promocode');
    if (foundPromocode.validTill < new Date())
      throw new GoneError(
        'This promo code has expired and is no longer valid.'
      );
    if (!foundPromocode.isActive)
      throw new GoneError('This promo code is no longer active');

    appResponse(res, {
      message: 'Promocode applied successfully',
      data: {
        discountPercentage: foundPromocode.discountPercentage,
        _id: foundPromocode._id,
      },
    });
  } catch (error) {
    next(error);
  }
}
