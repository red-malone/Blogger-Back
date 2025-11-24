const jwt=require('jsonwebtoken');
const secretKey=process.env.JWT_SECRET;
// Function to generate JWT token
const generateToken=(user)=>{
    return jwt.sign({
        id:user.userId,
        email:user.email,
        role:user.role
    },
    secretKey,
    {expiresIn:'15m'}

)
}

module.exports={generateToken};