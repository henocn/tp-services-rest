const mongoose = require('mongoose');

const henocUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[$\s@]+$/, "Please enter a valid email"]
    },
    password: {
        type: Number,
        required: true,
    },
    role: {
        type: String,
        enim: ['superadmin', 'admin', 'user']
    },
    quantity: {
        type: Number,
        required: true
    }

}, { timestamps: true });

const User = mongoose.model('henoc_user', henocUserSchema);
module.exports = User;