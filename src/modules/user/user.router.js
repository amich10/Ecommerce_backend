import { Router } from "express"
import allowUser from "../../middleware/auth.middleware.js";
import userCtrl from "./user.controller.js";

const userRouter  = Router();
userRouter.get('/',allowUser(),userCtrl.getAllUsers)
userRouter.get('/:id',allowUser(),userCtrl.getUserById)

export default userRouter;



