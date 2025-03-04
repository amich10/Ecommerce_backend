import joi from "joi";
import { userStatus } from "../../config/constants.js";

export const CreateCategoryDTO = joi.object({
    title:joi.string().min(2).max(100).required(),
    parentId:joi.string().allow(null,'').default(null).optional(),
    status:joi.string().regex(/^(active|inactive)$/).default(userStatus.INACTIVE)
})

export const updateCategoryDTO = joi.object({
    title:joi.string().min(2).max(100).required(),
    parentId:joi.string().allow(null,'').default(null).optional(),
    status:joi.string().regex(/^(active|inactive)$/).default(userStatus.INACTIVE),
    image:joi.string().allow(null,'').optional().default(null) // or //.unknown()
})
