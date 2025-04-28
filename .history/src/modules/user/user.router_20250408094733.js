import { Router } from "express"
import allowUser from "../../middleware/auth.middleware.js";

const userRouter  = Router()

userRouter.get('/users',allowUser())

export default userRouter;

