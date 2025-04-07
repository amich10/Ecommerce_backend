
import { v2 as cloudinary } from "cloudinary";
import { cloudinaryConfig } from "../config/constants.js";
import fs from "node:fs"

class CloudinaryService{

    constructor() {
        try{
            cloudinary.config({
                cloud_name: cloudinaryConfig.cloudName,
                api_key: cloudinaryConfig.apiKey,
                api_secret: cloudinaryConfig.apiSecret,
            })
        }
        catch(exception){
            //throw excption
            //console.log(exception)
            throw {
                code: 500,
                status: "ERROR_CONNECTING_CLOUDINARY",
                message:"Error while establishing connection with cloudinary service",
                detail: exception
            }
        }
    }
    fileUpload = async (filepath, dir='') =>{
        try{
            const uploadResult = await cloudinary.uploader.upload(filepath,{
                unique_filename: true,
                folder: "ecommerce/" + dir,
            })

            // delete original file from our server
            fs.unlinkSync(filepath)

            //optimized url 
            let optimizedUrl = cloudinary.url(uploadResult.public_id, {
                fetch_format: "auto",
                quality: "auto"
            })


            return {
                url: uploadResult.secure_url,
                optimizedUrl: optimizedUrl

            }
        }
        catch(exception){
            throw {
                code: 500,
                status: "ERROR_UPLOADING FILE_CLOUDINARY",
                message:"Error while uploading file in cloudinary",
                detail: exception
                
            };
        }
    }
}

const cloudinarySvc = new CloudinaryService()

export default cloudinarySvc;