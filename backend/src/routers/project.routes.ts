import express from 'express';
import { createProject, getProjects } from '../controllers/projects.controller';
import { verifyAdmin_Manager, verifyToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/projects', verifyToken, verifyAdmin_Manager, getProjects);
router.post('/create-project', verifyToken, verifyAdmin_Manager, createProject);

export default router;