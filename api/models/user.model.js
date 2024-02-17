import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        
    },
    profilePicture:{
        type:String,
        default: "https://www.shutterstock.com/image-illustration/default-avatar-profile-icon-social-260nw-2221359783.jpg",
    },
}, {timestamps: true});

const User=mongoose.model('User', userSchema);

export default User;