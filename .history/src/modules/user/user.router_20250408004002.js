import { Router } from "express"
import allowUser from "../../middleware/auth.middleware";

const userRouter  = Router()

userRouter.get('/users',allowUser)

export default userRouter;