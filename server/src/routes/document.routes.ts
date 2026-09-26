import { Router } from 'express';
import { uploadAndAnalyzeDocument, getDocumentById, getUserDocuments } from '../controllers/document.controller';
import { authenticate } from '../middleware/auth';
import { uploadMiddleware } from '../middleware/upload';

const router = Router();

router.use(authenticate);

router.post('/upload', uploadMiddleware.single('file'), uploadAndAnalyzeDocument);
router.get('/my', getUserDocuments);
router.get('/:id', getDocumentById);

export default router;
