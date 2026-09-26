import { Router } from 'express';
import {
  createGrievance,
  getGrievances,
  getGrievanceById,
} from '../controllers/grievance.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.post('/', createGrievance);
router.get('/', getGrievances);
router.get('/:id', getGrievanceById);

export default router;
