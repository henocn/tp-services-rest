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
        type: String,
        required: true,
        minlength : [8, 'Password should be at least 8 characters long'],
        maxlength : [10, 'Password should be at least 8 characters long'],
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,10}$/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number']
    },
    role: {
        type: String,
        enum: ['superadmin', 'admin', 'user']
    },
    quantity: {
        type: Number,
        required: true
    }

}, { timestamps: true });

const User = mongoose.model('henoc_user', henocUserSchema);
module.exports = User;