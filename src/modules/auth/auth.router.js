import { Router } from "express";
import authCtrl from "./auth.controller.js";
import { RegisterUserDTO,LoginUserDTO,ForgetPasswordDTO,ResetPasswordDTO } from "./auth.validator.js";
import { bodyValidator } from "../../middleware/request.validator.js";
import { uploader } from "../../middleware/file-handling.middleware.js";

const authRouter = Router()


// //middleware
// const myMiddleware = (req,res,next) =>{
//     //manipulate request before sending it forward

//     req.user = "My name is Amich"; //adding a custom property to req

//     //can send to next middleware or controller action
//     //can respond to client
//     //can trigger/call error handling middleware

//     //logging middleware execution
//     console.log("I am here")

//     // next(); //a. without any argument ===> next middleware call
//             //b. with an argument ===> calls express error handling middleware
    
//     next({    // error => object => argument
//         code: 401, 
//         message:"Authorization failed",
//         status: "ERROR",
//     })
    

// }


// controller action or endpoint 
// const registerUser = (req,res,next) =>{
//     res.json({
//         data : req.user, //accessing the modified request object
//         message: "Success call",
//         status : "OK",
//         options: null

//     })

// } 

//localhost:9005/ap1/v1/auth/register
authRouter.post('/register',uploader().single('image'), bodyValidator(RegisterUserDTO),authCtrl.registerUser)

authRouter.get('/activate/:token',authCtrl.activateUser)

authRouter.post('/login', bodyValidator(LoginUserDTO),authCtrl.userLogin) 

authRouter.get('/me', authCtrl.getUserProfile)

authRouter.post('/forget-password',authCtrl.forgetPassword)

authRouter.patch('/password-reset/:token',authCtrl.resetPassword)



export default authRouter;