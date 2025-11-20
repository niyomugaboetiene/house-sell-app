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
    const { title, description, price, bathrooms, bedrooms, size, yearBuilt, location, parkingSpace, hasGarden, PropertyType, isAvailable, Activity } = req.body;

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
        
        if (!title || !description || !price || !location || !bathrooms || !size || !yearBuilt || !Activity) {
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
                 video: videoPath,
                 Activity
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
route.get('/recentlyAdded', async(req ,res) => {
    try {
        const houses = await HouseSchema.find().sort({ createdAt: -1 }).limit(12).populate("owner", "full_name user_name _id role");
        if (houses.length > 0) {
           return res.status(200).json({ houses: houses });
       } 
       return res.status(404).json({ message: 'No house found' })
    } catch(error) {
        return res.status(500).json({ error: error.message })
    }

});

route.get('/houses/:_id', async(req ,res) => {
    const { _id } = req.params;
    try {
        const house = await HouseSchema.findById(_id).populate("owner", "full_name user_name _id role");
        if (house) {
           return res.status(200).json({ houses: house });
       } 
       return res.status(404).json({ message: 'No house found' })
    } catch(error) {
        return res.status(500).json({ error: error.message })
    }

});

route.post('/AddToCart/:_id', async(req, res) => {
   const { _id } = req.params;
   try {
    const IsHouseExist = await HouseSchema.findById(_id);
    const Buyer_id = req.session.userInfo.user_id;

    if (IsHouseExist) {
        const BuyHOuse = await HouseSchema.findByIdAndUpdate(_id, {
            buyer: Buyer_id,
            AddedToCart: true
        }, {
            new: true
        });

        if (BuyHOuse) {
            return res.status(201).json({ message: 'You buyed house' });
        } else {
           return res.status(400).json({ message: 'Failed to Buy a house' });
        }
    }  else {
         return res.status(404).json({ message: 'No house found' });
    }
   } catch (error) {
    return res.status(500).json({ error: error.message });
   } 
});

route.get('/myCart', async(req, res) => {
    const user_id = req.session.userInfo.user_id;
    try {
        const userCart = await HouseSchema.find({
           buyer: user_id,
           AddedToCart: true
        });

        if (userCart.length > 0) {
            return res.status(200).json({my_cart: userCart });
        } else {
              return res.status(401).json({ message: 'Login first' });
        }
    } catch(error) {
        return res.status(500).json({ error: error });
    }
})

export default route;