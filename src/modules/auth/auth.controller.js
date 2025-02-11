import cloudinarySvc from "../../services/cloudinary.service.js";

import bcrypt from "bcryptjs"
import { randomStringGenerator } from "../../utils/helpers.js";
import { userStatus } from "../../config/constants.js";

class AuthController {
    registerUser = async (req,res,next) =>{
        try{
            let data = req.body;

            //uploades files
            let file = req.file;
            //let files = req.files; //for multiple uploaded files (array)
    
            data.image =await cloudinarySvc.fileUpload(req.file.path, 'users/')

            data.password = bcrypt.hashSync(data.password,12)    //password encryption


            //token => email/sms send
            data.status = userStatus.INACTIVE  //active or inactive

            data.activationToken = randomStringGenerator();

            // decrypt and compare the passsword
            // let match = bcrypt.compareSync(data.confirmPassowrd, data.password)
            // console.log(match)

    
            res.json({
                data : data,
                message: " User register success call",
                status : "OK",
                options: null
        
            })
        }
        catch(exception){
            next(exception)
        }
    }

    activateAccount =(req,res,next) =>{
        const { token } =req.params;
        res.json({
            data: { token },
            message: `Account activation successful`,
            status: "OK",
            options: null
        })
    }

    userLogin = (req,res,next) =>{
        res.json ({
            message: "User login successful",
            status: "OK",
            options: null

        })
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