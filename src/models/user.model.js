const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        select:false
    },
    bio:{
        type:String,
        maxlength:160,
        default:''
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    socialLinks:{
        twitter:{type:String,default:''},
        linkedin:{type:String,default:''},
        github:{type:String,default:''},
        website:{type:String,default:''}
    },
    isActive:{
        type:Boolean,
        default:true
        
    },
   
},{
    timestamps:true
})

module.exports=mongoose.model('User',userSchema);