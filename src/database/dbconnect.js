const mongoose = require('mongoose');
const dbConfig = require('../config/database');

//database connectivity 
const connectDB=async ()=>{
    try{
        await mongoose.connect(dbConfig.url,{   
        })
        console.log('Database connected successfully');

    }catch(err){
        console.error('Database connection error:',err);
        process.exit(1); 
    }   
}

module.exports=connectDB;