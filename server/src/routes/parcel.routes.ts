import { Router } from 'express';
import {
  searchParcels,
  getParcelById,
  getParcelCases,
} from '../controllers/parcel.controller';

const router = Router();

router.get('/search', searchParcels);
router.get('/:id', getParcelById);
router.get('/:id/cases', getParcelCases);

export default router;
