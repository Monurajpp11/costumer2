import mongoose from 'mongoose';

const mediaFileSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    publicId: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    tags: [{
        type: String,
    }],
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
});

const MediaFile = mongoose.model('MediaFile', mediaFileSchema);
export default MediaFile;
