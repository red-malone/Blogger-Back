const Blog = require("../models/blog.model");

//put comment on a blog post
const putComment = async (req, res) => {
  try {
    const blogId = req.params.id;
    const { comment, user } = req.body;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    blog.comments.push({ comment, user, createdAt: new Date() });
    await blog.save();
    res.status(200).json({ message: "Comment added successfully" });
  } catch (e) {
    res.status(500).json({ message: "Error adding comment" });
  }
};

const editComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const { comment } = req.body;
    const blog = await Blog.findOne({ "comments._id": commentId });
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    const commentToEdit = blog.comments.id(commentId);
    if (!commentToEdit) {
      return res.status(404).json({ message: "Comment not found" });
    }
    commentToEdit.comment = comment;
    await blog.save();
    res.status(200).json({ message: "Comment updated successfully" });
  } catch (e) {
    res.status(500).json({ message: "Error editing comment" });
  }
};

const deleteComment= async (req,res)=>{
    try{
        const commentId=req.params.id;
        const blog=await Blog.findOne({"comments._id":commentId});
        if(!blog){
            return res.status(404).json({message:"Blog post not found"});
        }
        const commentToDelete=blog.comments.id(commentId);
        if(!commentToDelete){
            return res.status(404).json({message:"Comment not found"});
        }
        commentToDelete.remove();
        await blog.save();
        res.status(200).json({message:"Comment deleted successfully"});
    }catch(e){
        res.status(500).json({ message: "Error deleting comment" });
    }
}
module.exports = { putComment, editComment, deleteComment };
