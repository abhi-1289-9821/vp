import { Router } from 'express';
import { getCitizenDashboard, getCitizenCases } from '../controllers/citizen.controller';
import { authenticate, requireRole } from '../middleware/auth';

const router = Router();

router.use(authenticate);
router.use(requireRole('CITIZEN', 'ADMIN'));

router.get('/dashboard', getCitizenDashboard);
router.get('/cases', getCitizenCases);

export default router;

