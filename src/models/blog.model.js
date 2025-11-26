const mongoose = require('mongoose');

const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true   

    },
    content:{
        type:String,
        required:true,   
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    tags:{
        type:[String],
        default:[]
    },
    category:{
        type:String,
       default:'General'
    },
    likes:{
        type:Number,
        default:0
    },
    comments:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User',

            },
            comment:String,
            createdAt:{
                type:Date,
                default:Date.now
            }
        }
    ],
    isPublished:{
        type:Boolean,
        default:false
    },
    publishedAt:{
        type:Date,
        default:Date.now
    }   
},{
    timestamps:true
})


module.exports=mongoose.model('Blog',blogSchema);