import Lead from '../models/Lead.js';

// @desc    Create a new lead
// @route   POST /api/leads
// @access  Public
const createLead = async (req, res) => {
    const { name, email, phone, projectType, message } = req.body;

    try {
        const lead = await Lead.create({
            name,
            email,
            phone,
            projectType,
            message,
        });
        res.status(201).json(lead);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all leads
// @route   GET /api/leads
// @access  Private/Admin
const getLeads = async (req, res) => {
    try {
        const leads = await Lead.find({}).sort({ createdAt: -1 });
        res.json(leads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { createLead, getLeads };
