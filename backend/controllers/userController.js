import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndCookie from "../utils/helpers/generateTokenAndSetCookie.js";


const getUserProfile = async (req, res) => {
    const{username} = req.params;
    try {
        const user = await User.findOne({username}).select("-password").select("-updatedAt");
        if(!user) return res.status(400).json({error: "User not found"});        
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error: err.message});
        console.log("Error in getUserProfile: ", err.message);        
    }
}


//code for signUp user
const signupUser = async(req, res) => {
    try {
        const {name, email, username, password} = req.body;
        const user = await User.findOne({$or: [{email}, {username}]});

        if(user){
            return res.status(400).json({error:"User already exists"});
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            name,
            email,
            username,
            password: hashedPassword
        });

        await newUser.save();

        generateTokenAndCookie(newUser._id, res);

        if(newUser){
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                username: newUser.username,                
            });
        }
        else{
        res.status(400).json({error: "Invalid user data"});
            }
    }   
        catch (err) {
        res.status(500).json({ error: err.message})
        console.log("Error in signupUser: ", err.message)
    }
};


//code for login user 
const loginUser = async(req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect) return res.status(400).json({error: "Invalid username or password"});
        generateTokenAndCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            name: username,
            email: user.email,
            username: user.username,
        })
        
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error in loginUser:", error.message);       
    }
};

//code for logout user
const logoutUser = (req,res) => {
    try {
        res.cookie("jwt", "", {maxAge:1});
        res.status(200).json({message: "User logged out successfully"});
    } catch (err) {
        res.status(500).json({ error: err.message});
        console.log("Error in signupUser :", err.message);
    }
}; 

//code for follow and unfollow user
const followUnFollowUser = async(req,res) => {
    try {
        const {id} = req.params;
        //find the user you want to follow
        const userToModify = await User.findById(id);
        //you (as a user)
        const currentUser = await User.findById(req.user._id);

        if(id === req.user._id.toString()) return res.status(400).json({error: "You cannot follow/unfollow yourself"});

        if(!userToModify || !currentUser) return res.status(400).json({error: "User not found"});

    

        const isFollowing = currentUser.following.includes(id);
        if(isFollowing){
          //unfollow user
          //modify current user following, modify followers of userToModify 
          
          await User.findByIdAndUpdate(id, {$pull: {follower: req.user._id}});
          await User.findByIdAndUpdate(req.user._id, {$pull: {following: id}});
          res.status(200).json({message: "User unfollowed successfully"});
          
                      
        }
        else{
            //follow user
            
            await User.findByIdAndUpdate(id, {$push: {follower: req.user._id}});
            await User.findByIdAndUpdate(req.user._id, {$push: {following: id}});
            res.status(200).json({message: "user followed successfully"});

        }
        
    } catch (err) {
        res.status(500).json({ error: err.message});
        console.log("Error in followUnFollowUser: ", err.message);
    }
};

const updateUser = async (req, res) => {
    const{email, name,  username, password, profilePic, bio } = req.body;
    
    const userId = req.user._id;
    try {
        let user = await User.findById(userId);
        if(!user) return res.status(400).json({error : "User not found"});
        if(req.params.id !== userId.toString()) return res.status(400).json({error : "You cannot update other user's profile"});

        if(password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.username = username || user.username;
        user.profilePic = profilePic || user.profilePic;
        user.bio = bio || user.bio;

        user = await user.save();

        res.status(200).json({message : "Profile updated successfully", user});
        
    } catch (err) {
        res.status(500).json({error: err.message});
        console.log("Error in updateUser: ", err.message);
    };

};



export {signupUser, loginUser, logoutUser, followUnFollowUser, updateUser, getUserProfile};