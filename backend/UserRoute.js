import User from "./UserSchema.js"
import express from "express"
import bcrypt from "bcrypt";
import multer from "multer";
import UserSchema from "./UserSchema.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "User_Image/");
    }, 
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const uploads = multer({ storage });

router.post('/register', async(req, res) => {

    const { full_name, user_name, password, role } = req.body;
    
   try {
       if (!full_name || !user_name || !password || !role) {
            return res.status(500).json({message: "Missing fileds"});
       } 

       const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        full_name, user_name, password: hashedPassword, role
       });

       return res.status(201).json({message: 'User registered successfully' });
   } catch (err) {
    return res.status(500).json({error: err.message });
   }
});

router.post('/login', async(req, res) => {
    const { user_name, password } = req.body;

    try {
        if (!user_name || !password) {
            return res.status(500).json({error: "Missing fileds"});
        }

        const isExist = await User.findOne({user_name});
        const user = isExist;
        if (isExist) {
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (isPasswordMatch) {
                req.session.userInfo = {
                    user_id: user._id,
                    user_name: user.user_name,
                    full_name: user.full_name,
                    role: user.role,
                    image: user.image
                }
                return res.status(200).json({error: 'Logged in successfully', user: req.session.userInfo });
            } else {
                return res.status(401).json({ error: 'Password mismatching' })
            }
        } else {
                return res.status(401).json({ error: 'user name not found. you can create account before.' })
        }
    } catch (err) {
          return res.status(500).json({error: err.message });
    }
})

router.get('/userInfo', (req, res) => {
    if (req.session.userInfo) {
        res.status(200).json({ user: req.session.userInfo })
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
})

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Logout failed' });
        }
        res.clearCookie('connect.sid');
        return res.status(200).json({ message: 'Logged out successfully'})
    })
});

router.put('/updateProfile', uploads.single("image"), async(req, res) => {

    const { full_name, user_name, newPassword, oldPassword, role } = req.body;
   try {
    const userId = req.session?.userInfo?.user_id;
    
    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized login to customize your info.'})
    }
       if (!oldPassword) {
            return res.status(500).json({error: "Missing fields"});
       } 

       const OldData = await UserSchema.findById(userId);
       const isPasswordTrue = await bcrypt.compare(OldData.password, oldPassword);
       if (!isPasswordTrue) {
               return res.status(200).json({ error: 'Password does not match'})
       }
       const hashedPassword = newPassword.trim() ? await bcrypt.hash(newPassword, 10) : OldData.password;
       
       const ImagePath = req.file ? req.file.path : OldData.image;

       const NewData = {
                full_name,
                user_name, 
                password: hashedPassword, 
                role,
                image: ImagePath
       }
     const newUser = await User.findByIdAndUpdate(userId, NewData, {
        new: true
       });

       return res.status(201).json({ message: 'User updated successfully', user: newUser });
   } catch (err) {
    return res.status(500).json({error: err.message });
   }
})
export default router;