
import {userStatus } from "../../config/constants.js";;
import authSvc from "./auth.service.js";
import bcrypt from 'bcryptjs'

class AuthController {
    registerUser = async (req,res,next) =>{
        try{
           const userData = await authSvc.userRegisterTransformer(req);

           //DB store
           const userObj = await authSvc.userStore(userData)

            // decrypt and compare the passsword
            // let match = bcrypt.compareSync(data.confirmPassowrd, data.password)
            // console.log(match)

            //TODO: Email operation
            await authSvc.notifyActivationEmal({
                name:userObj.name,
                email:userObj.email,
                activationToken:userObj.activationToken
            })

            //link:https://<domain>/activate/token
    
            res.json({
                data :authSvc.publicUserProfile(userObj),
                message: " User register success call",
                status : "OK",
                options: null
        
            })
        }
        catch(exception){
            next(exception)
        }
    }

    activateUser = async (req, res, next) => {
        try {
            let token = req.params.token || null;
            if(!token){
                throw {
                    code: 422,
                    message:"Activation token is expected",
                    status: 'ACTIVATION TOKEN MISSING'
                }
            }
            // Find user with this activation token
            const associatedUser = await authSvc.getSingleUserByFilter({
                activationToken: token,
            });
            console.log("Associated user found:", associatedUser)
    
            if (!associatedUser) {
                return next({
                    code: 422,
                    message: "Token already used or does not exist",
                    status: "ACTIVATION_TOKEN_NOT_FOUND"
                });
            }
    
            // Activate account
            let userData = {
                status: userStatus.ACTIVE,
                activationToken: null
            };
    
            // Update user status
            await authSvc.updateSingleUserByFilter({_id: associatedUser._id }, userData);
    
            // Send response and ensure it's the last operation
            return res.json({
                data: null,
                message: "Thank you for registering with us. Your account has been successfully activated. Please login to continue.",
                status: "ACTIVATION_SUCCESS",
                options: null
            });
    
        } catch (exception) {
            return next(exception);
        }
    };
    

    userLogin = async(req,res,next) =>{
        try{
            const {email, password} = req.body;
            const user = await authSvc.getSingleUserByFilter({
                email:email
            })

            if(!user){
                throw{
                    code:422,
                    message:"User doesnot exist",
                    status:"USER_NOT_FOUND"
                }
            }
            else if(!bcrypt.compareSync(password,user.password)){
                throw{
                    code:403,
                    message:"Credential doesnot match",
                    status:"CREDENTIAL_DOESNOT_MATCH"
                }

            }
            else{
                //TODO: JWT Createand return user
            }

        }catch(exception){
            next(exception)
        }
    }

    getUserProfile = (req, res, next) => {
        res.json({
            message: "Fetching user profile",
            status: "OK"
        });
    };

    forgetPassword = (req, res, next) => {
        res.json({
            message: "Forgot password request received",
            status: "OK"
        });
    };

    resetPassword = (req, res, next) => {
        const { token } = req.params;
        res.json({
            message: `Resetting password with token: ${token}`,
            status: "OK"
        });
    };



}

const authCtrl = new AuthController()

export default authCtrl;