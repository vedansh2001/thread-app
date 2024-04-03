import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        //we take the token and if there is not any token that means nobody logged in 
        if(!token) return res.status(401).json({message: "Unauthorized"});

        //if token is present then we will verify it 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");    //we don't want to return password  
        req.user = user;
        next();

    } catch (err) {
        res.status(500).json({ message: err.message});
        console.log("Error in protectRoute :", err.message);
    }
}  

export default protectRoute;