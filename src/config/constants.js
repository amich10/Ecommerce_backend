
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

export const DBconfig ={
    mongodbUrl : process.env.MONGODB_URL,
    dbName: process.env.MONGO_DB_NAME
}

export const userRoles = {
    ADMIN : "admin",
    SELLER :"seller",
    CUSTOMER: "customer"
}

export const genderTypes = {
    MALE:"male",
    FEMALE:"female",
    OTHER:"other"
}

export const appConfig = {
    frontendUrl:process.env.FRONTEND_URL
}

export const smtpConfig ={
    fromAddress :process.env.SMTP_FROM,
    provider:process.env.SMTP_PROVIDER,
    host:process.env.SMTP_HOST,
    user:process.env.SMTP_USER,
    password:process.env.SMTP_PASSWORD,
    port:process.env.SMTP_PORT,
}