import { Router } from 'express';
import { validatePromocode } from '../controllers/promocode.controller.js';
const router = Router();

router.post('/validate', validatePromocode);

export default router;
