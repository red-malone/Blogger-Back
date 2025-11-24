const mongoose = require('mongoose');

const userCredSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,},
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    passwordHash:{
        type:String,
        required:true,
    },
})
module.exports=mongoose.model('UserCred',userCredSchema);