const {body,validationResult} = require('express-validator');

// Validation rules for user login and registeration

const registerValidator=[
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
]

const loginValidator=[
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
]
//middleware to check validation results
const validateUserMiddleware=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    next();
}  


module.exports={
    registerValidator       ,
    loginValidator,
    validateUserMiddleware
}
