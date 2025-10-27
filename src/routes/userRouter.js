const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/jwt');

const { registerUser, loginUser ,getUserDetails} = require('../controller/userController');
// User Registration Route
router.post('/register', registerUser);

// User Login Route
router.post('/login', loginUser);

//User Details Route
router.get('/profile',authMiddleware,getUserDetails)


module.exports = router;