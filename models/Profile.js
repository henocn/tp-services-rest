const mongoose = require('mongoose');

const henocProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    }

}, { timestamps: true });

const Profile = mongoose.model('henoc_profile', henocProfileSchema);
module.exports = Profile;