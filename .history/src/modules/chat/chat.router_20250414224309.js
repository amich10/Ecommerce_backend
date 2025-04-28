import { Router } from "express";
import allowUser from "../../middleware/auth.middleware";
import { bodyValidator } from "../../middleware/request.validator.js";
import chatDTO from "./chat.vallidator.js";
import chatCtrl from "./chat.controller.js";
const chatRouter = Router();

//store chat
chatRouter.post('/',allowUser(),bodyValidator(chatDTO),chatCtrl.storeChat)



export default chatRouter;