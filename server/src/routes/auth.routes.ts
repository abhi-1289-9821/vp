import { Router } from 'express';
import { register, login, getMe, verifyPan, verifyFace } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth';
import { uploadMiddleware } from '../middleware/upload';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticate, getMe);
router.post('/verify-pan', verifyPan);
router.post(
  '/verify-face',
  uploadMiddleware.fields([
    { name: 'panDocument', maxCount: 1 },
    { name: 'selfie', maxCount: 1 },
  ]),
  verifyFace
);

export default router;

