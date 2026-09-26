import { Router } from 'express';
import { getCitizenDashboard, getCitizenCases } from '../controllers/citizen.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/dashboard', getCitizenDashboard);
router.get('/cases', getCitizenCases);

export default router;
