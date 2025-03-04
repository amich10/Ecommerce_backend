import { Router } from "express";
import allowUser from "../../../middleware/auth.middleware.js";
import { userRoles } from "../../../config/constants.js";
import { bodyValidator } from "../../../middleware/request.validator.js";
import { addToCartDTO, deleteFromCartDTO } from "./order-detail.vallidaotr.js";
import orderDetailCtrl from "./order-detail.controller.js";

const orderDetailRouter = Router()

//add to cart
orderDetailRouter.post('/add',allowUser([userRoles.ADMIN,userRoles.CUSTOMER]),bodyValidator(addToCartDTO),orderDetailCtrl.addToCart)

//remove item from cart
orderDetailRouter.post('/remove',allowUser([userRoles.ADMIN,userRoles.CUSTOMER]),bodyValidator(deleteFromCartDTO),orderDetailCtrl.removeFromCart)

//view cart
orderDetailRouter.get('/view',allowUser([userRoles.ADMIN,userRoles.CUSTOMER]),orderDetailCtrl.viewMyCart)


export default orderDetailRouter;
