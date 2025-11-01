import { Router } from 'express';
import { bookExperience } from '../controllers/booking.controller.js';
import { verifyPayment } from '../controllers/verifyPayment.controller.js';

const router = Router();

router.post('/', bookExperience);
router.post('/verifypayment', verifyPayment);

export default router;
