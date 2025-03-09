import joi from "joi";

export const bannerDTO = joi.object({
    title:joi.string().min(5).max(255).required(),
    url:joi.string().uri().default('#'),
    status:joi.string().regex(/^(active|inactive)$/).default('active'),
    image:joi.string().allow(null,'').default(null).optional()
})