import mongoose from "mongoose"
import express from "express"
import cors from "cors"

mongoose.connect('mongodb://127.0.0.1:27017/house-selling', {})
.then(() => {
    console.log('Connected successfully')
}).catch((err) => {
    console.error(err);
})