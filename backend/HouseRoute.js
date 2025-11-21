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
            return res.status(400).json({ error: "you are not seller" });
        }
       const imagePath = req.files?.image  ? req.files.image.map((file) => file.filename) : [];
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

})

;route.get('/rent', async(req ,res) => {
    try {
        const houses = await HouseSchema.find({
            Activity: 'Rent'
        }).populate("owner", "full_name user_name _id role");
        if (houses.length > 0) {
           return res.status(200).json({ houses: houses });
       } 
       return res.status(404).json({ message: 'No house found' })
    } catch(error) {
        return res.status(500).json({ error: error.message })
    }

});

route.get('/buy', async(req ,res) => {
    try {
        const houses = await HouseSchema.find({
            Activity: 'Sell'
        }).populate("owner", "full_name user_name _id role");
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


route.put('/update/:_id', uploads.fields([
    { name: 'image', maxCount: 10 },
    { name: 'video', maxCount: 5 }
]), async (req, res) => {
    try {
        const { _id } = req.params;

        if (!req.session.userInfo) {
            return res.status(401).json({ error: "Login first" });
        }

        if (req.session.userInfo.role !== "seller") {
            return res.status(403).json({ error: "You are not a seller" });
        }

        const userId = req.session.userInfo.user_id;
        const house = await HouseSchema.findById(_id);

        if (!house) {
            return res.status(404).json({ error: "House not found" });
        }

        if (house.owner.toString() !== userId) {
            return res.status(403).json({ error: "You are not the owner of this house" });
        }

        const {
            title, description, price, bathrooms, bedrooms, size,
            yearBuilt, location, parkingSpace, hasGarden,
            PropertyType, isAvailable, Activity
        } = req.body;

        const locationData = location ? JSON.parse(location) : house.location;

        const imagePath = req.files?.image
            ? req.files["image"].map(f => f.filename)
            : house.image;

        const videoPath = req.files?.video
            ? req.files["video"].map(f => f.filename)
            : house.video;

        const newData = {
            title: title ?? house.title,
            description: description ?? house.description,
            price: price ?? house.price,
            location: locationData,
            bathrooms: bathrooms ?? house.bathrooms,
            bedrooms: bedrooms ?? house.bedrooms,
            size: size ?? house.size,
            yearBuilt: yearBuilt ?? house.yearBuilt,
            parkingSpace: parkingSpace ?? house.parkingSpace,
            hasGarden: hasGarden ?? house.hasGarden,
            PropertyType: PropertyType ?? house.PropertyType,
            isAvailable: isAvailable ?? house.isAvailable,
            Activity: Activity ?? house.Activity,
            image: imagePath,
            video: videoPath
        };

        const updated = await HouseSchema.findByIdAndUpdate(_id, newData, { new: true });

        return res.status(200).json({ message: "House updated successfully", house: updated });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default route;