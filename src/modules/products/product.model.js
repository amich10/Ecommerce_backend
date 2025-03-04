import mongoose from "mongoose";
import { userStatus } from "../../config/constants.js";

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        min:5,
        max:200,
        required:true
    },
    slug:{
        type:String,
        unique:true,
        required:true
    },
    sku:{
        type:String,
        unique:true,
        required:true
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:"Category",
        required:true
    },
    price:{
        type:Number,
        min:1000, //in paisa =>1000 paisa = 100 rs
        required:true

    },
    discount:{
        type:Number,
        min:0,
        max:80,
        default:null
    },
    afterDiscount:{
        type:Number,
        required: true
    },
    description:{
        type:String //html
    },
    status:{
        type:String,
        enum:Object.values(userStatus),
        default:userStatus.INACTIVE
    },
    brand:{
        type:mongoose.Types.ObjectId,
        ref:"Brand",
        default:null
    },
    seller:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    featured:{
        type:Boolean,
        default:false
    },
    attributes:[{  
        //size: S,M,L,XL
        name:String,
        value:[String]
    }],
    images:[{
        url:String,
        optimizedUrl:String
    }],
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
const productModel = mongoose.model("Product",productSchema)

export default productModel;