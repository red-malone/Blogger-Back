const User = require('../models/user.model');
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
        const user=await User.create({
            username,
            email,
            password:await bcrypt.hash(password,10)
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
        const user=await User.findOne({email}).select('+password')
        if(!user){
            return res.status(400).json({error:'Invalid email or password'});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({error:'Invalid email or password'});
        }
        const token=generateToken(user);   
        res.status(200).json({
            status:'Success',
            message:'User Login successfully',
            user: { id: user._id, username: user.username, email: user.email },
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
        const user=await User.findById(userId).select('-password');
        if(!user){
            return res.status(404).json({status:'error',message:'User not found'});
        }
        res.status(200).json({status:'Success',user});
    }catch(err){
        res.status(500).json({status:'Error', error:err.message});
    }
}


//exporting the controller functions
module.exports={registerUser,loginUser,getUserDetails};