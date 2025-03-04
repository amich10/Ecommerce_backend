import { Router } from "express";
import orderDetailRouter from "./order-details/order-detail.router.js";
import allowUser from "../../middleware/auth.middleware.js";
import { userRoles } from "../../config/constants.js";
import { bodyValidator } from "../../middleware/request.validator.js";
import { checkoutDTO } from "./order.vallidator.js";
import orderCtrl from "./order.controller.js";

const orderRouter = Router()

orderRouter.use('/detail',orderDetailRouter)

orderRouter.post('/checkout',allowUser([userRoles.ADMIN,userRoles.CUSTOMER]),bodyValidator(checkoutDTO),orderCtrl.checkOutOrder)

export default orderRouter;
