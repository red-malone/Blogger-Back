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

const editUserValidator = [
    // For username: Keep standard optional if you want to forbid empty strings when the key is present
    // OR use checkFalsy if you want to simply ignore empty updates.
    body('username')
        .optional({ checkFalsy: true }) 
        .notEmpty().withMessage('Username cannot be empty'),

    body('bio')
        .optional({ checkFalsy: true }) // Skips validation if bio is ""
        .isLength({ max: 160 }).withMessage('Bio cannot exceed 160 characters'),

    // For links: checkFalsy is crucial because isURL("") returns false
    body('socialLinks.twitter')
        .optional({ checkFalsy: true }) 
        .isURL().withMessage('Twitter link must be a valid URL'),

    body('socialLinks.linkedin')
        .optional({ checkFalsy: true })
        .isURL().withMessage('LinkedIn link must be a valid URL'),

    body('socialLinks.github')
        .optional({ checkFalsy: true })
        .isURL().withMessage('GitHub link must be a valid URL'),

    body('socialLinks.website')
        .optional({ checkFalsy: true })
        .isURL().withMessage('Website link must be a valid URL')
];
//middleware to check validation results
const validateUserMiddleware=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    next();
}  


module.exports={
    registerValidator,
    loginValidator,
    editUserValidator,
    validateUserMiddleware
}
