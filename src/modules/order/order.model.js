import mongoose from "mongoose";
import orderDetailModel from "./order-details/order-detail.model.js";
import { OrderStatus } from "../../config/constants.js";

const orderSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
    },
    customer: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderDetails: {
      type: mongoose.Types.ObjectId,
      ref: "OrderDetail",
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    serviceCharge: {
      type: Number,
      default: 0,
    },
    tax: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [OrderStatus.PENDING,OrderStatus.CANCELLED,OrderStatus.DELIVERED,OrderStatus.PROCESSING,OrderStatus.VERIFIED],
      default: OrderStatus.PENDING,
    },
    checkOutCompleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
    autoIndex: true,
    autoIndex: true,
  }
);

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;
