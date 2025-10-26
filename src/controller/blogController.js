const Blog=require('../models/blogModel');
const User=require('../models/user.model');

// Create a new blog post
const createBlog=async (req,res)=>{
    try{
        const { title, content, authorId ,tags,category} = req.body;

        // Check if the author exists
        const author = await User.findById(authorId);
        if (!author) {
            return res.status(400).json({ status: 'error', message: 'Author not found' });
        }
        const blog=await blog.create({
            title,
            content,
            author: authorId,
            tags,
            category,
            isPublished: true,
            publishedAt: new Date()
        })

        res.status(201).json({
            status: 'Success',
            message: 'Blog post created successfully',
            blog
        })
    }catch(err){
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Error creating blog post' });
    }
}

// Get all blog posts
const getAllBlogs=async(req,res)=>{
    try{
        const blogs=await Blog.find().populate('author','username email');
        res.status(200).json({
            status:'Success',
            blogs
        })

    }catch{
        res.status(500).json({ message: 'Error fetching blog posts' });
    }
}
// Get a single blog post by ID
const getBlogById=async(req,res)=>{
    try{
        const {id}=req.params;
        const blog=await Blog.findById(id).populate('author','username email');
        if(!blog){
            return res.status(404).json({status:'error',message:'Blog post not found'});
        }
        res.status(200).json({
            status:'Success',
            blog
        })
    }catch{
        res.status(500).json({ status: 'error', message: 'Error fetching blog post' });
    }
}   

//Updating a blog post
const updateBlog=async()=>{
    try{
        const {id}=req.params;
        const {title,content,tags,category}=req.body;
        const blog=await Blog.findById(id)

        if(!blog){
            return res.status(404).json({ status: 'error', message: 'Blog post not found' });
        }
        blog.title=title||blog.title;
        blog.content=content||blog.content;
        blog.tags=tags||blog.tags;
        blog.category=category||blog.category;
        blog.updatedAt=new Date();
        await blog.save();

        res.status(200).json({
            status:'Success',
            message:'Blog post updated successfully',
            blog
        })
    }catch(err){
        res.status(500).json({ status: 'error', message: 'Error updating blog post' });
    }
}

// Deleting a blog post
const deleteBlog=async(req,res)=>{
    try{
        const {id}=req.params;
        const blog=await Blog.findByIdAndDelete(id);
        if(!blog){
            return res.status(404).json({ status: 'error', message: 'Blog post not found' });
        }
        res.status(200).json({
            status:'Success',
            message:'Blog post deleted successfully',
            blog
        })
    }catch(err){
        res.status(500).json({ status: 'error', message: 'Error deleting blog post' });
    }
}   
// Exporting the controller functions
module.exports={createBlog,getAllBlogs,getBlogById,updateBlog,deleteBlog};