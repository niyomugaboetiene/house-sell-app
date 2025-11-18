import mongoose from "mongoose"
import express from "express"
import cors from "cors"
import userRoute from "./UserRoute.js"
import session from "express-session"

const app = express();
app.use(express.json());
app.use(cors());

app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'lax'
    }
}));


app.use('/user', userRoute);


mongoose.connect('mongodb://127.0.0.1:27017/house-selling', {})
.then(() => {
    console.log('Connected successfully')
}).catch((err) => {
    console.error(err);
});

app.listen(5000, () => {
    console.log('http://localhost:5000');
});