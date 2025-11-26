//initialise the required modules
const express=require('express')
const app=express();
const helmet =require('helmet')
const morgan =require('morgan') 
const errorHandler=require('./src/middleware/errorHandler')
const connectDB=require('./src/database/dbconnect')
const cors=require('cors')

//enable cors
app.use(cors());

//connect to database
connectDB();

//middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//health check route
app.get('/health',(req,res)=>{
    res.status(200).json({status:'OK',message:'API is healthy'});
})

//importing user routes
const userRouter=require('./src/routes/userRouter')
const blogRouter=require('./src/routes/blogRouter')
const commentRouter=require('./src/routes/commentRoute')


//Routes
app.use('/users',userRouter);
app.use('/blogs',blogRouter);
app.use('/comments',commentRouter);
//invalid route handler
app.use('/',(req,res,next)=>{
    const error=new Error('Route not found');
    error.status=404;
    next(error)
})

app.use(errorHandler)

module.exports=app;