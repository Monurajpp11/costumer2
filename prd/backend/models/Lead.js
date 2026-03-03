import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
    projectType: {
        type: String,
        enum: ['Residential', 'Commercial', 'Turnkey', 'Other'],
        default: 'Residential',
    },
    message: {
        type: String,
    },
    status: {
        type: String,
        enum: ['new', 'contacted', 'closed'],
        default: 'new',
    },
}, {
    timestamps: true,
});

const Lead = mongoose.model('Lead', leadSchema);
export default Lead;
