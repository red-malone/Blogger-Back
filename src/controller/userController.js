const jwt = require('jsonwebtoken');

// User Register Controller
const registerUser=(req,res)=>{
    res.send('User Registration Endpoint');
    const { username, email, password } = req.body;
}

// User Login Controller
const loginUser=(req,res)=>{
    res.send('User Login Endpoint');
}