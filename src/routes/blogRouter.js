const  blogController = require('../controller/blogController');
const express = require('express');
const router = express.Router();
const { validateBlog ,validateBlogMiddleware} = require('../validators/blogValidator');        
const authMiddleware = require('../middleware/jwt');
// Route to create a new blog post (protected)
router.post('/', authMiddleware, validateBlog, validateBlogMiddleware, blogController.createBlog);

// Route to get all blog posts
router.get('/', blogController.getAllBlogs);

// Route to get a single blog post by ID (protected)
router.get('/:id', authMiddleware,validateBlog,validateBlogMiddleware, blogController.getBlogById);

// Route to update a blog post (protected)
router.put('/:id', authMiddleware, validateBlog, validateBlogMiddleware, blogController.updateBlog);

// Route to delete a blog post (protected)
router.delete('/:id', authMiddleware, validateBlog, validateBlogMiddleware, blogController.deleteBlog);

module.exports = router;