import cloudinarySvc from "../../services/cloudinary.service.js";
import bcrypt from "bcryptjs"
import { randomStringGenerator } from "../../utils/helpers.js";
import { userStatus, appConfig, smtpConfig } from "../../config/constants.js";
import User from "../user/user.model.js";
import emailSvc from "../../services/email.service.js";

class AuthService{
    userRegisterTransformer = async (req) =>{
        try{

            let data = req.body;
            let file = req.file;
            data.name = data.fullName;
            data.image =await cloudinarySvc.fileUpload(req.file.path, 'users/')
            data.password = bcrypt.hashSync(data.password,12)    //password encryption
            data.status = userStatus.INACTIVE  //active or inactive
            data.activationToken = randomStringGenerator();
            // console.log("Request Body:", data);
            // console.log("Uploaded File:", file);

            return data;
        }
        catch(exception){
            throw exception
        }
    }

    userStore = async (data) =>{
        try{
            const userObj = new User(data)
            return await userObj.save() // inert operation
        }catch(exception){
            throw exception
        }
    }
    publicUserProfile = (userObj) =>{
        return {
            name: userObj.name,
            email: userObj.email,
            role:userObj.role,
            phone:userObj.phone,
            address:userObj.address,
            status:userObj.status,
            image:userObj.image,
            _id:userObj._id,
            createdAt:userObj.createdAt,
        }


    }

    getSingleUserByFilter = async (filter) =>{
        try{
            const user = await User.findOne(filter)
            return user;
        }
        catch(exception){
            throw exception
        }
    }

    updateSingleUserByFilter = async (filter, updateData) =>{
        try{
            let update = await User.findOneAndUpdate(filter, {$set: updateData}, {new:true}) // third arg no => data previous to update 
            console.log("Update filter:", filter, "Update data:", updateData, "Updated user:", update); // Debugging
            return  update
        }
        catch(exception){
            throw exception
        }

    }
    notifyActivationEmal = async ({name,email,activationToken}) =>{
        try{

            let msg = `
            <strong>Dear ${name},</strong> <br>
            <p>Thank you for your register</P>
            <p>Your username will be: <em>${email}.</em> To activate your account, Please click the link below or copy paste url in the browser of your choice.</p>
            <a href="${appConfig.frontendUrl}/activate/${activationToken}" style="color: #008000; text-decoration:underline;">
            ${appConfig.frontendUrl}activate/${userObj.activationToken}</a>
            <br>
            <p><strong>Regards,<strong></p>
            <p><strong>${smtpConfig.fromAddress}</strong></p>
            <p><small><em>Please do not reply to this email directly, please contact our administation for further assiatance.</em></small></p>`;

            return await emailSvc.sendEmail({
                to:userObj.email,
                sub:"Activate your account",
                message:msg
            })
       }catch(exception){
        throw exception
        }
    }

    notifyForgetPasswordEmail = async ({name,email,forgetPaswwordToken}) =>{
        try{

            let msg = `
            <strong>Dear ${name},</strong> <br>
            <p>You have requested to reset your passwod. To change your password, please follow the following steps.</P>
            </em>Please click the link below or copy paste url in the browser of your choice to reset your password</p>
            <a href="${appConfig.frontendUrl}verify-frget-token/${forgetPaswwordToken}" style="color: #008000; text-decoration:underline;">
            ${appConfig.frontendUrl}verify-forget-token/${forgetPaswwordToken}</a>
            <br>
            <p><strong>Note: This link is valid for 1 hour only.</strong></p>
            <p><strong>Regards,<strong></p>
            <p><strong>${smtpConfig.fromAddress}</strong></p>
            <p><small><em>Please do not reply to this email directly, please contact our administation for further assiatance.</em></small></p>`;

            return await emailSvc.sendEmail({
                to:email,
                sub:"Reset your password",
                message:msg
            })

            
       }catch(exception){
        throw exception
        }
    }

    

}

const authSvc = new AuthService()

export default authSvc;