import express from 'express';
import { getEmployees } from '../controllers/emp.controller';
const router = express.Router();

router.get('/employees', getEmployees);

export default router;