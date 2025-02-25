import nodemailer from 'nodemailer';
import { smtpConfig } from '../config/constants.js';
class EmailService{
    //node app ==> SMTP server ==> internet

    #transport; // acts as a bus to transport data from our node app to gmail server(SMTP server)
    constructor(){
        try{
            const mailConfig = {
                host:smtpConfig.host,
                port:smtpConfig.port,
                auth:{
                    user:smtpConfig.user,
                    pass:smtpConfig.password
                },
                //only for gmail
                //service:"gmail"
            }
            if(smtpConfig.provider === "gmail"){
                smtpConfig['service'] =smtpConfig.provider
            }

            this.#transport = nodemailer.createTransport(mailConfig) //takes one argument i.e mailConfig
        }
        catch(exception){
            console.log("----------Error connecting to SMTP server----------")
            throw exception
        }
    }

    sendEmail = async({
        to,sub,message
    }) =>{
        try{
            return await this.#transport.sendMail({
                to:to,
                from:smtpConfig.fromAddress,
                subject:sub,
                html:message,

                //optional
               /*  cc:"",
                bcc:"",
                attachments:"" */
            })
            
        }
        catch(exception){ //exception while sending email: low priority bug
            console.log("---------- Error while sending Email ----------")
            throw{
                // code:500, //default server serror
                message:"sending email failed",
                status:"EMAIL_SEND_ERROR"

            }
            

        }

    }
}
const emailSvc = new EmailService()

export default emailSvc;