import { Router } from 'express';
import {
  getCaseById,
  getCaseTimeline,
  getCaseCompensation,
  getCaseRR,
  getCaseDocuments,
  getCaseActions,
  updateActionStatus,
} from '../controllers/case.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// All case data routes require authentication
router.use(authenticate);

router.get('/:id', getCaseById);
router.get('/:id/timeline', getCaseTimeline);
router.get('/:id/compensation', getCaseCompensation);
router.get('/:id/rr', getCaseRR);
router.get('/:id/documents', getCaseDocuments);
router.get('/:id/actions', getCaseActions);
router.patch('/actions/:actionId', updateActionStatus);

export default router;
