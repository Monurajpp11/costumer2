import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['Residential', 'Commercial', 'Turnkey'],
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    budgetRange: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: [{
        type: String, // Cloudinary URLs
    }],
    beforeAfter: [{
        before: String,
        after: String,
    }],
    testimonial: {
        clientName: String,
        text: String,
        videoUrl: String,
    },
}, {
    timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
