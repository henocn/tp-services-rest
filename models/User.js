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
        enum: ['superadmin', 'admin', 'user'],
        default: 'user'
    },
    refrechToken: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });


henocUserSchema.methods.setActive = function() {
    this.isActive = true;
    return this.save();
}

henocUserSchema.methods.getActive = function() {
    return this.isActive;
}


const User = mongoose.model('henoc_user', henocUserSchema);
module.exports = User;