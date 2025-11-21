import User from "./UserSchema.js"
import express from "express"
import bcrypt from "bcrypt";

const router = express.Router();

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
    return res.status(500).json({message: err.message });
   }
});

router.post('/login', async(req, res) => {
    const { user_name, password } = req.body;

    try {
        if (!user_name || !password) {
            return res.status(500).json({message: "Missing fileds"});
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
                return res.status(200).json({message: 'Logged in successfully', user: req.session.userInfo });
            } else {
                return res.status(401).json({ message: 'Password mismatching' })
            }
        } else {
                return res.status(401).json({ message: 'user name not found. you can create account before.' })
        }
    } catch (err) {
          return res.status(500).json({message: err.message });
    }
})

router.get('/userInfo', (req, res) => {
    if (req.session.userInfo) {
        res.status(200).json({ user: req.session.userInfo })
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
})


router.put('/updateProfile/:_id', async(req, res) => {

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
    return res.status(500).json({message: err.message });
   }
})
export default router;