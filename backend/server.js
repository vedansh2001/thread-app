import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js"
import {v2 as cloudinary} from "cloudinary";

dotenv.config();

connectDB();
const app = express();

const PORT = process.env.PORT || 5000;

//connecting the cloudinary account from env file
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,

})

//this will parse the data in the req.body
app.use(express.json());  
//this will parse form data in the req.body
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

//Routes
app.use("/api/users",userRoutes);
app.use("/api/posts", postRoutes);


app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));