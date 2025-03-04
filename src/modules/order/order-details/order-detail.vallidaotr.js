import joi from "joi";

export const addToCartDTO = joi.object({
    productId:joi.string().required(),
    quantity:joi.number().min(1).max(10).required()
})

export const deleteFromCartDTO = joi.object({
    productId:joi.string().required(),
    quantity:joi.number().min(1).max(10).required()
})
