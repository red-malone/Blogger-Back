const Blog = require("../models/blog.model");

//put comment on a blog post
const putComment=async (req,res)=>{
    try{
       const blogId=req.params.id;
         const {comment,author}=req.body;
         const blog=await blog.findById(blogId);
         if(!blog){
            return res.status(404).json({message:"Blog post not found"});
         }
            blog.comments.push({comment,author,createdAt:new Date()});
            await blog.save();
            res.status(200).json({message:"Comment added successfully"});
    }catch(e){
        res.status(500).json({message:"Error adding comment"});
    }
}

const editComment=async (req,res)=>{
    try{
         const blogId=req.params.id;
         
    }catch(e){
        res.status(500).json({message:"Error editing comment"});
    }
}