import BaseService from "../../services/base.service.js";
import orderModel from "./order.model.js";
import { randomStringGenerator } from "../../utils/helpers.js";
import { OrderStatus } from "../../config/constants.js";
import emailSvc from "../../services/email.service.js";
import { appConfig } from "../../config/constants.js";

class OrderService extends BaseService {
  constructor() {
    super(orderModel);
  }

  orderTransformer = (cart, loggedInUser, discount = 0) => {
    let subTotal = 0;
    let cartId = [];

    cart.map((item) => {
      let price = item.product.afterDiscount;
      let amount = price * item.quantity;
      item.totalAmount = amount + item.deliveryCharge - item.discount;
      item.price = price;
      item.status = 'completed'

      subTotal += item.totalAmount;
      cartId.push(item._id);
    });

    // checkout

    const orderInfo = {
      code: randomStringGenerator(11),
      customer: loggedInUser._id,
      orderDetails: cartId,
      subTotal: subTotal,
      discount: discount || 0,
      serviceCharge: 0,
      tax: (subTotal - discount + 0) * 0.13, //0 = serviceTax 0.13= tax rate
      total: subTotal - discount + 0 + (subTotal - discount + 0) * 0.13,
      status: OrderStatus.PENDING,
      checkOutCompleted: false,
      createdBy: loggedInUser._id,
    };
    return { orderInfo, cartInfo: cart };
  };

  notifyOrderVerfication = async ({confirm, cancel, email}) => {
    try {
      const confirmLink = `${appConfig.frontendUrl}/verify-order/${confirm}/confirm`;
      const cancelLink = `${appConfig.frontendUrl}/verify-order/${cancel}/cancel`;

      let msg = `
        <h3>Dear user,</h3>
        <p>Thank you for your order. Please verify your order using the links below:</p>
        <p><a href="${confirmLink}" style="color: green; font-weight: bold;">Confirm Order</a></p>
        <p><a href="${cancelLink}" style="color: red; font-weight: bold;">Cancel Order</a></p>
        <p>If you did not place this order, please ignore this email.</p>
        <br>
        <p>Best Regards,</p>
      `;
      console.log({email})
      return await emailSvc.sendEmail({
        to:email,
        sub:"verify your order",
        message:msg,
      });
    } catch (exception) {
      console.error("Error sending order verification email:", exception);
      throw exception;
    }
  };

  listAllByFilters = async(query,filter = {}) =>{
    try {
      let page = +query.page || 1;
      let limit = +query.limit || 10;
      let skip = (page - 1) * limit;

      const list = await orderModel.find(filter)
          .populate("customer", ['_id','name','email','role','image','address','phone'])
          .populate("orderDetails")
          .sort({createdAt: "desc"})
          .skip(skip)
          .limit(limit)
      const count = await orderModel.countDocuments(filter)
      return {
        data: list, 
        pagination: {
          page: page,
          limit: limit, 
          total: count
        }
      }
    } catch (exception) {
      throw exception
    }
  }
}

const orderSvc = new OrderService();

export default orderSvc;
