import mongoose from "mongoose";
import { userStatus } from "../../config/constants.js";

const brandSchema = new mongoose.Schema({
    title:{
        type:String,
        min:2,
        max:100,
        unique:true,
        required:true
    },
    slug:{
        type:String,
        unique:true,
        required:true
    },
    status:{
        type:String,
        enum:Object.values(userStatus),
        default:userStatus.INACTIVE
    },
    image:{
        url:String,
        optimizedUrl:String
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        default:null
    },
    updatedBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        default:null
    }
},{
    timestamps:true,
    autoCreate:true,
    autoIndex:true
}
)
const brandModel = mongoose.model("Brand",brandSchema)

export default brandModel;