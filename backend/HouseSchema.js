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
            street: String,
        },
        
        bathrooms: {
            type: true,
            required: true
        },

        size: {
            type: Number
        },

        image: [
            {
            type: String
        }
    ],
    
         video: [
            {
                type: String
            }
         ],
         
    isAvailable: {
        type: Boolean,
        default: true
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },

    yearBuilt: Number,
    parkingSpace: Number,
    hasGarden: Boolean,

    PropertyType: {
        type: String
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

export default mongoose.model("House", HouseSchema);
