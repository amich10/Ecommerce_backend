import { Router } from "express";
import allowUser from "../../middleware/auth.middleware";
const chatRouter = Router();

//store chat
chatRouter.post('/',allowUser())



export default chatRouter;