const jwt=require('jsonwebtoken');
const secretKey=process.env.JWT_SECRET;
// Function to generate JWT token
const generateToken=(user)=>{
    return jwt.sign({
        id:user._id,
        email:user.email,
        role:user.role
    },
    secretKey,
    {expiresIn:'15m'}

)
}

module.exports={generateToken};