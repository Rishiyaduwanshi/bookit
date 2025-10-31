import { Router } from 'express';
import { bookExperience } from '../controllers/booking.controller.js';

const router = Router();

router.post('/', bookExperience);

export default router;
