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

route.post('/add', uploads.fields([
    { name: 'image', maxCount: 10 },
    { name: 'video', maxCount: 5 }
]), async(req, res) => {
    const { title, description, price, bathrooms, size, yearBuilt, location, parkingSpace, hasGarden, PropertyType, isAvailable } = req.body;

    const locationData = JSON.parse(location);

    try {
        if (!req.session.userInfo) {
            return res.status(401).json({error: 'Login first' });
        }
        if (req.session.userInfo.role !== "seller") {
            return res.status(400).json({error: "you are not seller" });
        }
       const imagePath = req.files ? req.files?.filename : null;
       const videoPath = req.files?.video ? req.files?.video.map((file) => file.filename) : [];
      
        const owner = req.session.userInfo.user_id;
        
        if (!title || !description || !price || !location || !bathrooms || !size || !yearBuilt) {
            return res.status(400).json({ error: "Some fileld is missing" });
        }

            await HouseSchema.create({
                 title,
                 description,
                 price,
                 location: locationData,
                 bathrooms,
                 bedrooms,
                 size,
                 yearBuilt,
                 parkingSpace,
                 hasGarden,
                 PropertyType,
                 owner: owner,
                 isAvailable,
                 image: imagePath,
                 video: videoPath
            });

            return res.status(201).json({ message: 'House inserted successfully' });
    
    } catch (error) {
        return res.status(500).json({ error: error });
    }
})

route.get('/houses', async(req ,res) => {
    try {
        const houses = await HouseSchema.find().populate("owner", "full_name user_name _id role");
        if (houses.length > 0) {
           return res.status(200).json({ houses: houses });
       } 
       return res.status(404).json({ message: 'No house found' })
    } catch(error) {
        return res.status(500).json({ error: error.message })
    }

});
export default route;