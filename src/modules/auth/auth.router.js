import { Router } from "express";

const authRouter = Router()

authRouter.post('/register',(req,res,next) =>{

})

authRouter.get('/activate/:token',(req,res,next) =>{

})

authRouter.post('/login',(req,res,next) =>{

}) 

authRouter.get('/me',(req,res,next) =>{

})

authRouter.post('/forget-password',(req,res,next) =>{

})

authRouter.patch('/password-reset/:token',(req,res,next) =>{

})


export default authRouter;