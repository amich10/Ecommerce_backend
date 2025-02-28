import joi from "joi";
import { userStatus } from "../../config/constants.js";

export const CreateBrandDTO = joi.object({
    title:joi.string().min(2).max(100).required(),
    status:joi.string().regex(/^(active|inactive)$/).default(userStatus.INACTIVE)
})