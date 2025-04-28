import mongoose from "mongoose";
import { genderTypes, userRoles, userStatus } from "../../config/constants.js";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        min: 2,
        max:50
    },
    email:{
        type: String,
        required:true,
        unique:true                   //11000 status code

    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum:[userRoles.ADMIN,userRoles.SELLER,userRoles.CUSTOMER],
        default:userRoles.CUSTOMER
    },
    gender:{
        type: String,
        enum:[genderTypes.MALE,genderTypes.FEMALE,genderTypes.OTHER]
    },
   
    
    activationToken:String,
    status:{
        type:String,
        enum:[userStatus.INACTIVE,userStatus.ACTIVE],
        default:userStatus.INACTIVE
    },
    forgetPasswordToken:String,
    expiryDate:Date,
    image:{
        url:String,
        optimizedUrl: String
    }
},{
    //configuration of table
    timestamps: true, //created_at, updated_at
    autoCreate: true,
    autoIndex: true
})

const User = mongoose.model('User', userSchema);

export default User;