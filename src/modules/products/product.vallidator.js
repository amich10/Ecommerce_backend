import joi from "joi";
import { userStatus } from "../../config/constants.js";

export const CreateProductDTO = joi.object({
    title:joi.string().min(2).max(100).required(),
    category:joi.string().required(),
    price:joi.number().min(1000).required(),
    discount:joi.number().min(0).max(80).default(0),
    description:joi.string().required(),
    brand:joi.string().allow(null,'').optional(),
    status:joi.string().regex(/^(active|inactive)$/).default(userStatus.INACTIVE),
    featured:joi.boolean().default(false),
    attributes:joi.array().items(
        joi.object({
            name:joi.string().required(),
            value:joi.array().items(joi.string().required()).required()
        })
    ).allow(null,'').optional().default(null)
})

export const updateProductDTO = joi.object({
    title:joi.string().min(2).max(100).required(),
    category:joi.string().required(),
    price:joi.number().min(1000).required(),
    discount:joi.number().min(0).max(80).default(0),
    description:joi.string().required(),
    brand:joi.string().allow(null,'').optional(),
    status:joi.string().regex(/^(active|inactive)$/).default(userStatus.INACTIVE),
    featured:joi.boolean().default(false),
    attributes:joi.array().items(
        joi.object({
            name:joi.string().required(),
            value:joi.array().items(joi.string().required()).required()
        })
    ).allow(null,'').optional().default(null),
    images:joi.string().allow(null,'').optional().default(null)
})
