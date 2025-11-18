import User from "./UserSchema.js"
import express from "express"
import bcyrpt from "bcrypt";

const router = express.Router();

router.post('/register', async(req, res) => {

    const { full_name, user_name, password, role } = req.body;
   try {
       if (!full_name || !user_name || !password || !role) {
            return res.status(500).json({message: "Missing fileds"});
       } 

      await User.create({
        full_name, user_name, password, role
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
        if (isExist) {
            const isPasswordMatch = await User.findOne({password});
            if (isPasswordMatch) {
                req.session.userInfo = {
                    user_id: _id,
                    user_name: user_name,
                    role: role
                }
                return res.status(200).json({message: 'Logged in successfully' });
            } else {
                return res.status(400).json({ message: 'Password mismatching' })
            }
        } else {
                return res.status(401).json({ message: 'user name not found. you can create account before.' })
        }
    } catch (err) {
          return res.status(500).json({message: err.message });
    }
})

export default router;