const mongoose = require('mongoose');

const henocProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Electronics', 'Clothing', 'Books', 'Fournitures', 'Others']
    },
    isActive: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });