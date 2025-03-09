
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
    frontendUrl:process.env.FRONTEND_URL,
    jwtSecret:process.env.JWT_SECRET,
}

export const smtpConfig ={
    fromAddress :process.env.SMTP_FROM,
    provider:process.env.SMTP_PROVIDER,
    host:process.env.SMTP_HOST,
    user:process.env.SMTP_USER,
    password:process.env.SMTP_PASSWORD,
    port:process.env.SMTP_PORT,
}


export const OrderStatus = {
    PENDING:"pending",
    VERIFIED:"verified",
    CANCELLED:"cancelled",
    PROCESSING:"processing",
    DELIVERED:"delivered"
}

export const postgresConfig ={
    dialect:process.env.DB_DIALECT,
    host:process.env.DB_HOST,
    username:process.env.DB_USERNAME,
    port:process.env.DB_PORT,
    password:process.env.DB_PASSWORD,
    dbName:process.env.DB_DBNAME
}
