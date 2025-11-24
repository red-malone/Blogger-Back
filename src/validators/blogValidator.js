const {body,validationResult} = require('express-validator');

// Validation rules for creating a blog post
const validateBlog=[
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
]
// Middleware to check validation results
const validateBlogMiddleware=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    next();
}       
module.exports={
    validateBlog,
    validateBlogMiddleware
}