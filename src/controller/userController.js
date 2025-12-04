const User = require('../models/user.model');
const UserCred = require('../models/userCred.model');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwtgenerator');

// User Register Controller
const registerUser=async (req,res)=>{
    try{
        const {username,email,password}=req.body;
        //check if user already exists
        const existingUser=await User.findOne({email})
        if(existingUser){
            return  res.status(400).json({error:'User with this email already exists'});
        }
        const existingUsername=await User.findOne({username})
        if(existingUsername){
            return  res.status(400).json({error:'Username already taken'});
        }
        const user=await User.create({
            username,
        })
        await UserCred.create({
            userId:user._id,
            email,
            passwordHash:await bcrypt.hash(password,10)
        })
        res.status(201).json({
            status:'Success',
            message:'User registered successfully',user
        })
        
    }catch(err){
        res.status(500).json({error:err.message});
    }
    
}

// User Login Controller
const loginUser=async (req,res)=>{        
    try{
        const {email,password}=req.body;
        const user=await UserCred.findOne({email}).select('+passwordHash')
        if(!user){
            return res.status(400).json({error:'Invalid email or password'});
        }
        const isMatch=await bcrypt.compare(password,user.passwordHash);
        if(!isMatch){
            return res.status(400).json({error:'Invalid email or password'});
        }
        const userDetail=await User.findById(user.userId);
        const token=generateToken(user);  
        res.status(200).json({
            status:'Success',
            message:'User Login successfully',
            user: { id: user.userId, username: userDetail.username, email: user.email },
            token
        })
        

    }catch(err){
        res.status(500).json({error:err.message});
    }
}

//Get USer Details Controller
const getUserDetails=async(req,res)=>{
    try{
        const userId=req.user.id;
        const user=await User.findById(userId);
        if(!user){
            return res.status(404).json({status:'error',message:'User not found'});
        }
        res.status(200).json({status:'Success',user});
    }catch(err){
        res.status(500).json({status:'Error', error:err.message});
    }
}

const editUserDetails=async(req,res)=>{
    try{
        const userId=req.user.id;
        const {username,bio,socialLinks}=req.body
        const usernameExists=await User.findOne({username});
        if(usernameExists && usernameExists._id.toString()!==userId){
            return res.status(400).json({status:'error',message:'Username already taken'});
        }
        const user=await User.findById(userId);
        if(!user){
            return res.status(404).json({status:'error',message:'User not found'});
        }
        user.username=username||user.username;
        user.bio=bio||user.bio;
        user.socialLinks=socialLinks||user.socialLinks;
        await user.save();
        res.status(200).json({status:'Success',message:'User details updated successfully',user});
    }catch(err){
        res.status(500).json({status:'Error', error:err.message});
    }
}
//exporting the controller functions
module.exports={registerUser,loginUser,getUserDetails,editUserDetails};