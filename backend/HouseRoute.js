import HouseSchema from "./HouseSchema";
import express from "express"

const route = express.Router();

route.post('/add', async(req, res) => {
    const { title, description, price, location, bathrooms, size, yearBuilt, parkingSpace, hasGarden, PropertyType } = req.body;

    try {
        if (!title || !description || !price || !location || !bathrooms || !size || yearBuilt) {
            await HouseSchema.create({
                
            })
        }
    }
})