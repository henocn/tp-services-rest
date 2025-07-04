const mongoose = require('mongoose');

const henocUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['superadmin', 'admin', 'user']
    }

}, { timestamps: true });

const User = mongoose.model('henoc_user', henocUserSchema);
module.exports = User;