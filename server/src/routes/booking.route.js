import { Router } from 'express';
import {
  bookExperience,
  getBookingDetails,
} from '../controllers/booking.controller.js';
import { verifyPayment } from '../controllers/verifyPayment.controller.js';

const router = Router();

router.post('/', bookExperience);
router.post('/verifypayment', verifyPayment);
router.get('/details', getBookingDetails);

export default router;
