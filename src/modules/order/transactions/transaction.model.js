import mongoose from "mongoose";

const transactionSchem = new mongoose.Schema(
  {
    code,
    order,
    amount,
    mode,
    refid,
    response,
    status,
    customer,
  },
  {
    autoCreate: true,
    autoIndex: true,
    timestamps: true,
  }
);

const transactionModel = new mongoose.model("Transaction", transactionSchem);

export default transactionModel;

// (paid, unpaid, refund/cancelled)
