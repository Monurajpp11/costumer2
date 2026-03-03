import mongoose from 'mongoose';

const calculatorRuleSchema = new mongoose.Schema({
    basePricePerSqFt: {
        type: Number,
        required: true,
        default: 2500, // example: $2500 / sqFt
    },
    roomMultiplier: {
        type: Number,
        required: true,
        default: 1.2,
    },
    materialMultiplier: {
        type: Number,
        required: true,
        default: 1.5, // 1 for standard, 1.5 for premium
    },
    cityMultiplier: {
        type: Number,
        required: true,
        default: 1.0,
    },
}, {
    timestamps: true,
});

const CalculatorRule = mongoose.model('CalculatorRule', calculatorRuleSchema);
export default CalculatorRule;
