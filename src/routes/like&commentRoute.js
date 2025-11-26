const express=require('express');
const router=express.Router();
const commentController=require('../controller/like&commentController');
const authMiddleware=require('../middleware/jwt');

//Route to like/unlike a blog post
router.put('/like/:id',authMiddleware,commentController.likeunlikeBlog);
//Route to put comment on a blog post
router.put('/:id',authMiddleware,commentController.putComment);
//Route to edit comment on a blog post
router.put('/:id/edit',authMiddleware,commentController.editComment);
//Route to delete comment on a blog post
router.delete('/:id',authMiddleware,commentController.deleteComment);
module.exports=router;
