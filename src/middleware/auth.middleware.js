
import jwt from "jsonwebtoken"
import { appConfig, userRoles } from "../config/constants.js";
import authSvc from "../modules/auth/auth.service.js";

//customers, admin, sellers

const allowUser = (roles= null) =>{  // user logged in or not and permission allowed or not
    return async (req,res,next) => {
        //validate
        try{
            let token = req.headers['authorization'] || null;

            //remove Bearer from {Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Ik}
            if(!token){
                next({
                    code:401, //unauthorized
                    message:"unauthenticated",
                    status:"UNAUTHENTICATED"
                })
            }
    
            else{
    
    
                //token = token.replace('Bearer ') 
    
    
                //"Bearer token".split(" ") = ["Bearer", "token"].pop() =>token
                token = token.split(" ").pop();
                //console.log(token)
    
    
                //verfiy the token
                //let payload = jwt.decode()
                let payload = jwt.verify(token,appConfig.jwtSecret)
                //console.log(payload)
                
               if(payload.typ ==='access'){
                 
                //validate:sub
                const user = await authSvc.getSingleUserByFilter({
                    _id: payload.sub
                })

                if(!user){
                    next({
                        code:401,
                        
                        message:"user not found",
                        status:"USER_NOT_FOUND"
                    })
                }else{
                    //globally available
                    req.authUser= authSvc.publicUserProfile(user);

                    if(!roles || user.role === userRoles.ADMIN){ //alowed by all user
                        next()
                    } 
                    else{
                        //LOGGED IN USER THAT ARE NOT ADMIN
                        if(roles.includes(user.role)){
                            next()
                        }else{
                            next({
                                code:403,
                                message:"You donot have access to this resource",
                                status:"UNAUTHORIZED",
                            })
                        }
                    }
                }
               }else{
                next({
                    code:401,
                    message:"Invalid token type",
                    status:"UNAUTHENTICATED"
                })
               }
    
            }
        }catch(exception){

        // exception handling => error like token exppired

            // console.log(exception)

            next({
                code:401,
                message:exception.message,
                status:"Unauthenticated"
            })
        }

    }
}

//allowUser()  => allowed by all user
// allowUser(['admin']) =>allowed by admin users
//allowUser(['admin','seller']) =>allowed by admin and seller users

export default allowUser;