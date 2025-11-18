import HouseSchema from "./HouseSchema";
import express from "express"

const route = express.Router();

route.post('/add', async(req, res) => {
    const { title, description, price, location, bathrooms, size, yearBuilt, parkingSpace, hasGarden, PropertyType } = req.body;

    try {
        if (!req.session.userInfo) {
            return res.status(401).json({message: 'Login first' });
        }

        const owner = req.session.userInfo._id;
        if (!title || !description || !price || !location || !bathrooms || !size || yearBuilt) {

            await HouseSchema.create({
                 title,
                 description,
                 price,
                 location,
                 bathrooms,
                 size,
                 yearBuilt
            })
        }
    }
})