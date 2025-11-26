const express=require('express');
const router=express.Router();
const commentController=require('../controller/commentController');

//Route to put comment on a blog post
router.post('/:id/comment',commentController.putComment);
//Route to edit comment on a blog post
router.put('/:id/comment',commentController.editComment);
module.exports=router;
