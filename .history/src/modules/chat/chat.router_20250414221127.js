import { Router } from "express";
import allowUser from "../../middleware/auth.middleware";
import { bodyValidator } from "../../middleware/request.validator";
import chatDTO from "./chat.vallidator";
const chatRouter = Router();

//store chat
chatRouter.post('/',allowUser(),bodyValidator(chatDTO))



export default chatRouter;