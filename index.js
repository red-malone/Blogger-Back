//initialise the required modules
const express=require('express')
const app=express();
const helmet =require('helmet')
const morgan =require('morgan') 
const errorHandler=require('./src/middleware/errorHandler')

//middleware
app.use(helmet());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}))



//health check route
app.get('/health',(req,res)=>{
    res.status(200).json({status:'OK',message:'API is healthy'});
})


//invalid route handler
app.use('/',(req,res,next)=>{
    const error=new Error('Route not found');
    error.status=404;
    next(error)
})

app.use(errorHandler)

module.exports=app;