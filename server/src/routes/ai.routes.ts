import { Router } from 'express';
import {
  directExtractDocument,
  explainDocumentText,
  detectDiscrepancyApi,
} from '../controllers/ai.controller';

const router = Router();

router.post('/extract-document', directExtractDocument);
router.post('/explain-document', explainDocumentText);
router.post('/detect-discrepancy', detectDiscrepancyApi);

export default router;
