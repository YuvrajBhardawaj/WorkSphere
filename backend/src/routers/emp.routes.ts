import express from 'express';
import { getEmployees, getManagers } from '../controllers/emp.controller';
const router = express.Router();

router.get('/employees', getEmployees);
router.get('/managers', getManagers);
export default router;