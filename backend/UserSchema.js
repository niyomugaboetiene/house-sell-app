import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
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
        type: String,
        enum: ['admin', 'seller', 'customer'],
        default: "customer"
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },
    image: {
            type: String
    }

})

export default mongoose.model("User", UserSchema)