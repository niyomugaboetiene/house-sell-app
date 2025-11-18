import HouseSchema from "./HouseSchema.js";
import express from "express"
import multer from "multer";

const route = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "House_Images/");
    }, 
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const uploads = multer({ storage });

route.post('/add', uploads.single("image"), async(req, res) => {
    const { title, description, price, location, bathrooms, size, yearBuilt, parkingSpace, hasGarden, PropertyType, isAvailable, image, video } = req.body;
    const imagePath = req.file ? req.file.filename : null;

    try {
        if (!req.session.userInfo) {
            return res.status(401).json({message: 'Login first' });
        }
      
        const owner = req.session.userInfo.user_id;
        
        if (!title || !description || !price || !location || !bathrooms || !size || yearBuilt) {
            return res.status(400).json({ message: "Some fileld is missing" });
        }

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
                 image: imagePath,
                 video
            });

            return res.status(201).json({ message: 'House inserted successfully' });
    
    } catch (error) {
        return res.status(500).json({ message: error });
    }
})

export default route;