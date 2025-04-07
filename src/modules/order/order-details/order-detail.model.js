import mongoose from "mongoose";

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
    status:{
        type:String,
        enum:['new','completed','cancelled'],
        default:'new'
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

const orderDetailModel = mongoose.model('OrderDetail',orderDetailSchema)

export default orderDetailModel;