import mongoose from "mongoose";
import orderModel from "../order.model.js";

const orderDetailSchema = new mongoose.Schema({
    order:{
        type:mongoose.Types.ObjectId,
        ref:"Order",
        default:null

    },
    customer:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:"Product",
        required:true
    },
    quantity:{
        type:Number,
        min:1,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:1000 //in paisa
    },
    discount:{
        type:Number,
        default:0
    },
    seller:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        default:null
    },
    deliveryCharge:{
        type:Number,
        default:1000 //paisa
    },
    totalAmount:{
        type:Number,
        required:true
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
    autoIndex:true,
    autoIndex:true
})

const orderDetailModel = mongoose.model('OderDetail',orderDetailSchema)

export default orderDetailModel;