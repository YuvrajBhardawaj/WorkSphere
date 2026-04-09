import express from 'express';
import { createUser, getMe, login } from '../controllers/auth.controller';
import { verifyAdmin, verifyToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/create-user', verifyToken, verifyAdmin, createUser);
router.post('/login', login);
router.get('/me', verifyToken, getMe);
export default router;