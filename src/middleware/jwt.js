const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const authMiddleware=(req,res,next)=>{
    const token=req.header('Authorization')?.replace('Bearer ','');
    if(!token){
        return res.status(401).json({status:'error',message:'Access denied. No token provided.'});
    }
    try{
        const decode=jwt.verify(token,secretKey);
        req.user=decode;
        next();

    }catch(err){
        return res.status(400).json({status:'error',message:'Invalid token.'});
    }
}

module.exports=authMiddleware;