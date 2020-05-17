import { Router } from 'express';
import usersRoutes from './users';
import authRoutes from './auth';

const router = Router();

router.use('/users', usersRoutes);
router.use('/auth', authRoutes);

export default router;