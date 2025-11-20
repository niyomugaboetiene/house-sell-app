import mongoose, { mongo } from "mongoose";

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
            type: Number,
            required: true,
            default: 0
        },
        
        bedrooms: {
            type: Number,
            required: true,
            default: 0
        },

        size: {
            type: Number,
            default: 0
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

    AddedToCart: {
        type: Boolean,
        default: false

    },

    Activity: {
       type: String,
       enum: ['Sell', 'Rent'],
       default: 'Sell',
       required: true
    },

    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    
    isBuyed: {
        type: Boolean,
        default: false
    },

    PropertyType: {
        type: String,
        enum: ["Office", "House", "Industry", "Apartment", "Land"],
        default: "House"
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

export default mongoose.model("House", HouseSchema);
