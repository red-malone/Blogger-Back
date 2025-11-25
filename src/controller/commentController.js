const Blog = require("../models/blog.model");

//put comment on a blog post
const putComment=async (req,res)=>{
    try{
        
    }catch(e){
        res.status(500).json({message:"Error adding comment"});
    }
}