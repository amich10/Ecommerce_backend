import { Router } from "express"
import authRouter from "../modules/auth/auth.router.js";
import bannerRouter from "../modules/banner/banner.router.js";

const router = Router()

router.use('/auth',authRouter)

router.use('/banner',bannerRouter)

export default router;