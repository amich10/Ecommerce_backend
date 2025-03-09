import orderDetailSvc from "./order-details/order-detail.service.js";
import orderSvc from "./order.service.js";
import { appConfig } from "../../config/constants.js";
import emailSvc from "../../services/email.service.js";
import { OrderStatus } from "../../config/constants.js";

class OrderController {
  checkOutOrder = async (req, res, next) => {
    try {
      const { cartId, discount } = req.body;
      const loggedInUser = req.authUser;

      // Validate cart items
      const cart = await orderDetailSvc.getAllOrderDetailByfilter({
        _id: { $in: cartId },
        order: null,
        customer: loggedInUser._id,
      });

      if (cartId.length !== cart.length) {
        throw {
          code: 422,
          message: "Some cart items do not belong to this user or do not exist",
          status: "PARTIAL_CART_NOT_FOUND",
        };
      }

      // Transform cart info and create order
      const { cartInfo, orderInfo } = orderSvc.orderTransformer(
        cart,
        loggedInUser,
        discount
      );
      let order = await orderSvc.create(orderInfo);

      // Attach order to cart items
      const cartSave = cartInfo.map((cartItem) => {
        cartItem.order = order._id;
        return cartItem.save();
      });

      await Promise.allSettled(cartSave);

      let mail = loggedInUser.email;
      // console.log(mail);

      // Send email
      await orderSvc.notifyOrderVerfication({
        confirm: OrderStatus.VERIFIED,
        cancel: OrderStatus.CANCELLED,
        email: mail,
      });
      res.json({
        data: order,
        message:
          "Your order has been placed successfully. Please check your email to verify your order.",
        status: "ORDER_PLACED",
      });
    } catch (exception) {
      console.error("Error in checkOutOrder:", exception);
      next(exception);
    }
  };

  updateOrder = async (req, res, next) => {
    try {
      const { code, status } = req.params;

      // Validate status
      if (!["verified", "cancelled"].includes(status.toLowerCase())) {
        return res.status(400).json({
          message: "Invalid status. Use 'verified' or 'cancelled'.",
          status: "INVALID_REQUEST",
        });
      }

      // Find the order
      let order = await orderSvc.getSingleRow({ code });

      if (!order) {
        return res.status(404).json({
          message: "Order not found.",
          status: "ORDER_NOT_FOUND",
        });
      }

      // Check if order is already processed
      if (order.status !== OrderStatus.PENDING) {
        return res.status(400).json({
          message: `Order has already been processed (${order.status}).`,
          status: `ORDER_ALREADY_${order.status}`,
        });
      }

      // Update order status
      order.status =
        status.toLowerCase() === "verified"
          ? OrderStatus.VERIFIED
          : OrderStatus.CANCELLED;
      order.checkOutCompleted = status.toLowerCase() === "verified";
      await order.save();

      res.json({
        message: `Your order has been ${order.status.toLowerCase()}.`,
        status: `ORDER_${order.status}`,
      });
    } catch (exception) {
      console.error("Error in updateOrder:", exception);
      next(exception);
    }
  };
}

const orderCtrl = new OrderController();
export default orderCtrl;
