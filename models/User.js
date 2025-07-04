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
    },
    refrechToken: {
        type: String
    },
    action: [{
        type: String
    }]

}, { timestamps: true });


henocUserSchema.methods.setAction = (action) => {
    this.actions.push(action);
    return this.save();
}

henocUserSchema.methods.getAction = () => {
    return this.action;
}

const User = mongoose.model('henoc_user', henocUserSchema);
module.exports = User;