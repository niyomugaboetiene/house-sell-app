import User from "./UserSchema.js"
import express from "express"

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

export default router;