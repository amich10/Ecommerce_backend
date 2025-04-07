import orderDetailSvc from "./order-details/order-detail.service.js";
import orderSvc from "./order.service.js";
import { userRoles } from "../../config/constants.js";
import { OrderStatus } from "../../config/constants.js";
import transactionSvc from "./transactions/transcation.service.js";

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

      const transactionObj = transactionSvc.transformTOTransaction(order);
      const transaction = await transactionSvc.create(transactionObj);

      res.json({
        data: {
          order: order,
          transaction: transaction,
        },
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

  listAllOrder = async (req, res, next) => {
    try {
      const loggedInUser = req.authUser;

      let filter = {};

      if (req.query.status) {
        filter = {
          status: req.query.status,
        };
      }

      let list = [];
      let pagination;
      if (loggedInUser.role === userRoles.ADMIN) {
        // list all orders
        let { data, pagination: paging } = await orderSvc.listAllByFilters(
          req.query,
          filter
        );
        list = data;
        pagination = paging;
      } else if (loggedInUser.role === userRoles.CUSTOMER) {
        // own orders
        filter = {
          ...filter,
          customer: loggedInUser._id,
        };
        let { data, pagination: paging } = await orderSvc.listAllByFilters(
          req.query,
          filter
        );
        list = data;
        pagination = paging;
      } else if (loggedInUser.role === userRoles.SELLER) {
        // own product's orders
        filter = {
          seller: loggedInUser._id,
          order: { $ne: null },
          status: { $nin: ["new", "cancelled"] },
        };
        let { data, pagination: paging } =
          await orderDetailSvc.getAllOrderDetailByFilterWithPagination(
            req.query,
            filter
          );
        list = data;
        pagination = paging;
      }

      res.json({
        data: list,
        message: "Your orders",
        status: "SUCCESS",
        options: { ...pagination },
      });
    } catch (exception) {
      next(exception);
    }
  };

  getOrderDetail = async(req, res, next) => {
    try {
      const id = req.params.id;
      let filter = {
        order: id
      }
      const {data, pagination} = await orderDetailSvc.getAllOrderDetailByFilterWithPagination(req.query, filter)
      res.json({
        data: data,
        message: "Your order Detail",
        status: "SUCCESS",
        options: { ...pagination },
      });
    } catch(exception) {
      next(exception)
    }
  }
}

const orderCtrl = new OrderController();
export default orderCtrl;
