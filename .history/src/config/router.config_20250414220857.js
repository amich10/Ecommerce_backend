import { Router } from "express"
import authRouter from "../modules/auth/auth.router.js";
import bannerRouter from "../modules/banner/banner.router.js";
import brandRouther from "../modules/brand/brand.router.js";
import categoryRouther from "../modules/category/category.router.js";
import productRouther from "../modules/products/product.router.js";
import orderRouter from "../modules/order/order.router.js";
import userRouter from "../modules/user/user.router.js";

const router = Router()

router.use('/auth',authRouter)

router.use('/banner',bannerRouter)

router.use('/brand',brandRouther)

router.use('/category',categoryRouther)
router.use('/product',productRouther)
router.use('/order',orderRouter)
router.use('/users',userRouter)
appConfig.use('/chat',ch)

export default router;