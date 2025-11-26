const express=require('express');
const router=express.Router();
const commentController=require('../controller/commentController');
const authMiddleware=require('../middleware/jwt');

//Route to put comment on a blog post
router.put('/:id',authMiddleware,commentController.putComment);
//Route to edit comment on a blog post
router.put('/:id/edit',authMiddleware,commentController.editComment);
//Route to delete comment on a blog post
router.delete('/:id',authMiddleware,commentController.deleteComment);
module.exports=router;
