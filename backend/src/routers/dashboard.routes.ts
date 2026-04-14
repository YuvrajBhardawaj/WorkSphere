import express from 'express';
import { getDashboardStats } from '../controllers/dashboard.controller';
import { verifyAdmin_Manager, verifyToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/dashboard', verifyToken, verifyAdmin_Manager, getDashboardStats);

export default router;