import mongoose, { mongo } from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6      
    },
    profilePic:{
        type: String,
        default: ""
    },
    follower: {
        type: [String],
        default: []
    },
    following: {
        type: [String],
        default: []
    },
    bio: {
        type: String,
        default: ""
    }

}, {
    timestamps: true,
});

//this will create a model name 'User' based on the provided userSchema
const User = mongoose.model('User', userSchema);

export default User;