import joi from "joi";

export const checkoutDTO = joi.object({
    cartId: joi.array().items(joi.string().required()).required(),
    discount:joi.number().allow(null,0,'').default(0)

})