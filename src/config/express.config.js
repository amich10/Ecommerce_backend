import express from "express";
import router from "./router.config.js";
import cookieParser from "cookie-parser";
const app = express()

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

  //no need to change
  res.status(statusCode).json({   //500, default se
  // rver error
    error:errorDetail,
    messgae: msg,
    status: status,
    options: null
  })
})

export default app;