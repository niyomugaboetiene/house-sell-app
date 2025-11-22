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
        if (req.session.userInfo.role !== "seller" && req.session.userInfo.role !== "admin") {
            return res.status(400).json({ error: "you are not seller or admin" });
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
       return res.status(404).json({ error: 'No house found' })
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
       return res.status(404).json({ error: 'No house found' })
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
       return res.status(404).json({ error: 'No house found' })
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
       return res.status(404).json({ error: 'No house found' })
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
       return res.status(404).json({ error: 'No house found' })
    } catch(error) {
        return res.status(500).json({ error: error.message })
    }

});

// get user's properties based on their session
route.get('/myProperties', async(req ,res) => {
    try {
        if (!req.session.userInfo) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const userId = req.session.userInfo.user_id;

        const house = await HouseSchema.find({ owner: userId }).populate("owner", "full_name user_name _id role");
        if (house) {
           return res.status(200).json({ houses: house });
       } 
       return res.status(404).json({ error: 'No house found' })
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
            return res.status(201).json({ error: 'You buyed house' });
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
              return res.status(401).json({ error: 'Login first' });
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

        if (req.session.userInfo.role !== "seller" && req.session.userInfo.role !== "admin") {
            return res.status(403).json({ error: "You are not a seller or admin" });
        }

        const userId = req.session.userInfo.user_id;
        const house = await HouseSchema.findById(_id);

        if (!house) {
            return res.status(404).json({ error: "House not found" });
        }

        if (house.owner.toString() !== userId) {
            return res.status(403).json({ error: "You are not the owner of this house" });
        }

        let updateData = {};

        for (let key in req.body) {
            if (req.body[key] !== "" && req.body[key] !== undefined && key !== 'location') {
                updateData[key] = req.body[key];
            }
        }

        if (req.body.location) {
            let locationUpdate;
            
            if (typeof req.body.location === 'string') {
                try {
                    locationUpdate = JSON.parse(req.body.location);
                } catch (error) {
                    return res.status(400).json({ error: "Invalid location format" });
                }
            } else {
                locationUpdate = req.body.location;
            }

            updateData.location = {
                ...house.location.toObject(),
                ...locationUpdate
            };
        }

        if (req.files?.image) {
            updateData.image = req.files.image.map(f => f.filename);
        }

        if (req.files?.video) {
            updateData.video = req.files.video.map(f => f.filename);
        }

        console.log('Update data being sent to DB:', updateData); 

        const updated = await HouseSchema.findByIdAndUpdate(
            _id, 
            updateData, 
            { new: true, runValidators: true }
        );
        
        return res.status(200).json({ house: updated });
      
    } catch (error) {
        console.error("Update error:", error);
        return res.status(500).json({ error: error.message });
    }
});

route.post('/delete/:_id', async(req, res) => {
    try {
        if (!req.session.userInfo) {
            return res.status(401).json({ error: "Login first" });
        }

        const { _id } = req.params;
        const userId = req.session.userInfo.user_id;

        const house = await HouseSchema.findById(_id);
        if (!house) return res.status(404).json({ error: 'House not found' });

        if (house.owner.toString() !== userId && req.session.userInfo.role !== "admin") {
            return res.status(403).json({ message: 'You are not the owner' });
        }

        if (req.session.userInfo.role !== "seller" && req.session.userInfo.role !== "admin") {
            return res.status(403).json({ error: "You are not a seller or admin" });
        }


        await HouseSchema.findByIdAndDelete(_id);
        return res.status(200).json({ message: 'House deleted successfully' });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

route.get("/search", async (req, res) => {
  try {
    const { query, country, Activity, district, city, sector, PropertyType } =
      req.query;

    let searchFilter = {};

    const orConditions = [];

    if (query) {
      orConditions.push({ title: { $regex: query, $options: "i" } });
      orConditions.push({ description: { $regex: query, $options: "i" } });
      orConditions.push({ "location.country": { $regex: query, $options: "i" } });
      orConditions.push({ "location.city": { $regex: query, $options: "i" } });
      orConditions.push({
        "location.district": { $regex: query, $options: "i" },
      });
      orConditions.push({
        "location.sector": { $regex: query, $options: "i" },
      });
    }

    if (orConditions.length > 0) {
      searchFilter.$or = orConditions;
    }

    if (country)
      searchFilter["location.country"] = { $regex: country, $options: "i" };
    if (city)
      searchFilter["location.city"] = { $regex: city, $options: "i" };
    if (district)
      searchFilter["location.district"] = { $regex: district, $options: "i" };
    if (sector)
      searchFilter["location.sector"] = { $regex: sector, $options: "i" };
    if (Activity)
      searchFilter.Activity = { $regex: Activity, $options: "i" };
    if (PropertyType)
      searchFilter.PropertyType = { $regex: PropertyType, $options: "i" };

    const Houses = await HouseSchema.find(searchFilter);

    res.status(200).json({
      message: "Search result",
      Houses,
      total: Houses.length,
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Search failed", error: error.message });
  }
});

route.get('/allAddedToCart', async(req ,res) => {
    try {
        if (req.session.userInfo.role !== "admin") {
            return res.status(401).json({ message: 'You are not admin' });
        }
        const AllProperties = await HouseSchema.find({ AddedToCart: true}).populate("owner", "full_name user_name role");
        if (AllProperties.length > 0) {
            return res.status(200).json({ houses: AllProperties});
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

route.post('/like/:_id', async(req, res) => {
    const { _id } = req.params;

    try {
       const UserId = req.session?.userInfo?.user_id;
       if (!UserId) {
        return res.status(401).json({ error: 'Unauthorized '})
       }

       const IsHouseExist = await HouseSchema.findById(_id);
       
       if (!IsHouseExist) {
        return res.status(404).json({ error: 'House not exist' });
       }

       const isAlreadyLiked = IsHouseExist.likes.includes(UserId);
       if (isAlreadyLiked) {
        return res.status(400).json({ message: 'Aready liked' });
       }

       IsHouseExist.likes.push(UserId);
       await IsHouseExist.save();

       return res.status(200).json({ message: 'Liked successfully', totalLikes: IsHouseExist.likes.length });
       
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default route;