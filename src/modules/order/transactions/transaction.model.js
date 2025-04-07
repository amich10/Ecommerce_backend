
import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    code:{
      type:String,
      unique:true,
      required:true
    },
    order:{
      type:mongoose.Types.ObjectId,
      required:true
    },
    amount:{
      type:Number,
      required:true,
      min:0
    },
    mode:{
      type:String,
      enum:['cash','online','khalti','esewa','bank'],
    },
    refid:{
      type:String,
    },
    response:{
      type:String
    },
    status:{
      type:String,
      enum:['paid','unpaid','cancelled','refund'],
      default:'unpaid'
    },
    customer:{
      type:mongoose.Types.ObjectId,
      ref:'User',
      default:null
    },
  },
  {
    autoCreate: true,
    autoIndex: true,
    timestamps: true,
  }
);

const transactionModel = new mongoose.model("Transaction", transactionSchema);

export default transactionModel;

// (paid, unpaid, refund/cancelled)
