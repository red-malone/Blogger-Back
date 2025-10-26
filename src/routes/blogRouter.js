const  blogController = require('../controllers/blogController');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/jwt');
// Route to create a new blog post (protected)
router.post('/', authMiddleware, blogController.createBlog);

// Route to get all blog posts
router.get('/', blogController.getAllBlogs);

// Route to get a single blog post by ID (protected)
router.get('/:id', authMiddleware,blogController.getBlogById);

// Route to update a blog post (protected)
router.put('/:id', authMiddleware, blogController.updateBlog);

// Route to delete a blog post (protected)
router.delete('/:id', authMiddleware, blogController.deleteBlog);

module.exports = router;