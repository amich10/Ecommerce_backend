
import {config } from "dotenv"
config()

export const cloudinaryConfig = {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET
};


export const userStatus = {
    ACTIVE: "active",
    INACTIVE: "inactive"
}