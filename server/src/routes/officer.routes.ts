import { Router } from 'express';
import {
  getOfficerDashboard,
  getOfficerCases,
  getOfficerGrievances,
  updateCaseStage,
  updateGrievanceStatus,
} from '../controllers/officer.controller';
import { authenticate, requireRole } from '../middleware/auth';

const router = Router();

router.use(authenticate);
router.use(requireRole('OFFICER', 'ADMIN'));

router.get('/dashboard', getOfficerDashboard);
router.get('/cases', getOfficerCases);
router.get('/grievances', getOfficerGrievances);
router.patch('/cases/:id', updateCaseStage);
router.patch('/grievances/:id', updateGrievanceStatus);

export default router;
