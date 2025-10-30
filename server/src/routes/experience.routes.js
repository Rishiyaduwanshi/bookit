import { Router } from 'express';
import { getEachExperience, listAllExperiences } from '../controllers/experience.controller.js';

const router = Router();

router.get('/', listAllExperiences);
router.get('/:id', getEachExperience);

export default router;
