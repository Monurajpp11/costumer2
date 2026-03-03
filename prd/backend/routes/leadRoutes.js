import express from 'express';
import { createLead, getLeads } from '../controllers/leadController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(createLead).get(protect, admin, getLeads);

export default router;
