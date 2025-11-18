import mongoose from "mongoose";

const User = new mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },
  
    user_name: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        enum: ['admin', 'seller', 'customer'],
        default: 'customer'
    },

    createdAt: {
        type: Date(),
        default: Date.now()
    }

})