import { Router } from 'express';
import authRoutes from './auth.routes';
import citizenRoutes from './citizen.routes';
import caseRoutes from './case.routes';
import parcelRoutes from './parcel.routes';
import documentRoutes from './document.routes';
import aiRoutes from './ai.routes';
import grievanceRoutes from './grievance.routes';
import notificationRoutes from './notification.routes';
import officerRoutes from './officer.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/citizen', citizenRoutes);
router.use('/cases', caseRoutes);
router.use('/parcels', parcelRoutes);
router.use('/documents', documentRoutes);
router.use('/ai', aiRoutes);
router.use('/grievances', grievanceRoutes);
router.use('/notifications', notificationRoutes);
router.use('/officer', officerRoutes);

export default router;
