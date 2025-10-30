import { Router } from 'express';
import { listAllExperiences } from '../controllers/experience.controller.js';

const router = Router();

router.get('/', listAllExperiences);

export default router;
