import { Router } from "express";
import allowUser from "../../middleware/auth.middleware";
import { bodyValidator } from "../../middleware/request.validator";
const chatRouter = Router();

//store chat
chatRouter.post('/',allowUser(),bodyValidator(chat))



export default chatRouter;