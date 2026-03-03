import express from 'express';
import { calculateEstimate, updateRules } from '../controllers/calculatorController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/estimate', calculateEstimate);
router.put('/rules', protect, admin, updateRules);

export default router;
