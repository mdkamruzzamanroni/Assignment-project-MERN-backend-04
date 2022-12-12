//Basic Library Library Import
const express=require('express');
const router=require('./src/routes/api');
const app= new express();
const bodyParser=require('body-parser');


//Security middleware Library Import
const rateLimit=require('express-rate-limit');
const helmet=require('helmet');
const mongoSanitize=require('express-mongo-sanitize');
const xss=require('xss-clean');
const hpp=require('hpp');
const cors=require('cors');

//Database Library Import
const mongoose= require('mongoose');

//Security middleware implement
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

//Body Parser Implement
app.use(bodyParser.json())

//Request Rate Limit
const limiter= rateLimit({WindowMs:15*60*1000,max:3000})
app.use(limiter)

//Mongo DB Database connection
let URI ="mongodb://127.0.0.1:27017/Todo";
let OPTION= {user:'',pass:'',autoIndex:true}
mongoose.connect(URI,OPTION,(error)=>{
console.log("connection success")
console.log(error)
})

//Routing Implement
app.use("/api/v1/",router)

//Undefined routing implement
app.use("*",(req,res)=>{
res.status(404).json({status:"fail",data:"not found"})
})

module.exports=app;