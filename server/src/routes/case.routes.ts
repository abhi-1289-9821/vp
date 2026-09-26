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
import { authenticate, optionalAuthenticate } from '../middleware/auth';

const router = Router();

router.get('/:id', optionalAuthenticate, getCaseById);
router.get('/:id/timeline', optionalAuthenticate, getCaseTimeline);
router.get('/:id/compensation', optionalAuthenticate, getCaseCompensation);
router.get('/:id/rr', optionalAuthenticate, getCaseRR);
router.get('/:id/documents', optionalAuthenticate, getCaseDocuments);
router.get('/:id/actions', optionalAuthenticate, getCaseActions);
router.patch('/actions/:actionId', authenticate, updateActionStatus);

export default router;
