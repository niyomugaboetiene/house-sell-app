import mongoose from "mongoose";

const HouseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
        description: {
             type: String,
             required: true
        },
        
        price: {
            type: Number,
            required: true
        },
        location: {
            country: String,
            city: String,
            district: String,
            sector: String,
            street: String
        }
    
})