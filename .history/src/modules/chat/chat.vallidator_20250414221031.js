import joi from "joi";

const chatDTO = joi.object({
    receiver:joi.string().required()
})