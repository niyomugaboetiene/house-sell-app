import mongoose from "mongoose"
import express from "express"
import cors from "cors"
import userRoute from "./UserRoute.js"
import session from "express-session"
import HouseRoute from "./HouseRoute.js"

const app = express();
app.use(express.json());
app.use("/House_Images", express.static("House_Images"));
app.use("/User_Image", express.static("User_Image"));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

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
app.use('/house', HouseRoute);

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.APP_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Message from ${name}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Message sent successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to send message.");
  }
});

mongoose.connect('mongodb://127.0.0.1:27017/house-selling', {})
.then(() => {
    console.log('Connected successfully')
}).catch((err) => {
    console.error(err);
});

app.listen(5000, () => {
    console.log('http://localhost:5000');
});