import express from "express";
import router from "./router.config.js";
import cookieParser from "cookie-parser";
import './db.config.js'
import cors from "cors"

//sql server
import "./sequelize.config.js"
import rateLimit from "express-rate-limit";
import helmet from "helmet";

const app = express()


//Server security policy
//allow corss
//allowing cors on specific route
/* app.post('/health',cors(),(req,res,next) =.{

})
 */
//allowing cors on overall app
app.use(cors({
  origin: "http://localhost:5173"
}))
//rate limiter
const limiter = rateLimit({
  windowMs:60000,   //blocker time limit (1 min = 60 sec = 60000millisec)
  limit:30
})
app.use(limiter)
//content policy
app.use(helmet())






//parsers

// JSON content
app.use(express.json())

//www.urlencoded
app.use(express.urlencoded({
  extended: false
}))

//cookie
app.use(cookieParser())

// Mount /load express router
//versioning
app.use('/ap1/v1',router);
// Query and params


// client side error to be send when specific route is not defined
app.use((req,res,next) =>{
  next({
      code: 404,
      message: "Not Found",
      status: "NOT-FOUND"
  })
})


// error handling middleware
app.use((error,req,res,next) =>{

  //console.log(error)
  let statusCode = error.code || 500;
  let msg = error.message || "Internal server error...."
  let status = error.status || "SERVER_ERROR"
  let errorDetail = error.detail || null

  //statusCode,msg,status, errorDetail => change based on error type

  // specific errors
  if(error.name ==='MongoServerError'){
    statusCode = 422;
    if(error.code === 11000){
      statusCode = 400;
      
      let key = Object.keys(error.keyPattern).pop(); //pop removes last element and adds it to the key
      errorDetail = {
        // email:"Email has been already taken or should be unique!"
        [key]: key + " has been already taken or should be unique!"
      };
      msg = "unique validation failed"
      status = "validation failed"
    }

  }

  //no need to change
  res.status(statusCode).json({   //500, default se
  // server error
    error:errorDetail,
    message: msg,
    status: status,
    options: null
  })
})

export default app;