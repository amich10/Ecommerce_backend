import { Router } from "express"
import allowUser from "../../middleware/auth.middleware.js";
import userCtrl from "./user.controller.js";

const userRouter  = Router();
userRouter.get('/',allowUser(),userCtrl.getAllUsers)
export default userRouter;



