import HouseSchema from "./HouseSchema.js";
import express from "express"

const route = express.Router();

route.post('/add', async(req, res) => {
    const { title, description, price, location, bathrooms, size, yearBuilt, parkingSpace, hasGarden, PropertyType, isAvailable, image, video } = req.body;

    try {
        if (!req.session.userInfo) {
            return res.status(401).json({message: 'Login first' });
        }

        const owner = req.session.userInfo.user_id;
        if (!title || !description || !price || !location || !bathrooms || !size || yearBuilt) {

            await HouseSchema.create({
                 title,
                 description,
                 price,
                 location,
                 bathrooms,
                 size,
                 yearBuilt,
                 parkingSpace,
                 hasGarden,
                 PropertyType,
                 owner: owner,
                 isAvailable,
                 image,
                 video
            });

            return res.status(201).json({ message: 'House inserted successfully' });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
})

export default route;