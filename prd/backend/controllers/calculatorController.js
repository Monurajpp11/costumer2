import CalculatorRule from '../models/CalculatorRule.js';

// @desc    Calculate estimate
// @route   POST /api/calculator/estimate
// @access  Public
const calculateEstimate = async (req, res) => {
    const { sqFt, rooms, materialGrade, cityMultiplierValue } = req.body;

    try {
        let rules = await CalculatorRule.findOne();
        if (!rules) {
            // Create default if not exists
            rules = await CalculatorRule.create({});
        }

        const basePricePerSqFt = rules.basePricePerSqFt;
        const roomMult = rules.roomMultiplier;

        // Apply material multiplier override if passed, or use standard
        const materialMult = materialGrade === 'Premium' ? rules.materialMultiplier : 1.0;

        // Apply city multiplier override if passed, or use standard
        const cityMult = cityMultiplierValue || rules.cityMultiplier;

        const base = sqFt * basePricePerSqFt;
        const roomCost = rooms * roomMult * 1000; // Arbitrary 1k base per room adjusted
        const materialCost = materialMult * base;
        const locationCost = cityMult * base;

        const totalEstimate = base + roomCost + materialCost + locationCost;

        res.json({
            estimate: totalEstimate,
            breakdown: {
                base,
                roomCost,
                materialCost,
                locationCost,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update calculator rules
// @route   PUT /api/calculator/rules
// @access  Private/Admin
const updateRules = async (req, res) => {
    try {
        let rules = await CalculatorRule.findOne();
        if (!rules) {
            rules = new CalculatorRule();
        }

        rules.basePricePerSqFt = req.body.basePricePerSqFt || rules.basePricePerSqFt;
        rules.roomMultiplier = req.body.roomMultiplier || rules.roomMultiplier;
        rules.materialMultiplier = req.body.materialMultiplier || rules.materialMultiplier;
        rules.cityMultiplier = req.body.cityMultiplier || rules.cityMultiplier;

        const updatedRules = await rules.save();
        res.json(updatedRules);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { calculateEstimate, updateRules };
