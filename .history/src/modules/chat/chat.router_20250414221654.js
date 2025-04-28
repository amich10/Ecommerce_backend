import { Router } from "express";
import allowUser from "../../middleware/auth.middleware";
import { bodyValidator } from "../../middleware/request.validator";
import chatDTO from "./chat.vallidator";
import chatCtrl from "./chat.controller";
const chatRouter = Router();

//store chat
chatRouter.post('/',allowUser(),bodyValidator(chatDTO),chatCtrl)



export default chatRouter;