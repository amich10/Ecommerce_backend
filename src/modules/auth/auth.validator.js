import joi from "joi";

const RegisterUserDTO = joi.object({   
    fullName:joi.string().min(2).max(50).required().messages({
        "string.min": "Full name must be at least 2 characters long.",
        "string.max": "The length of fullName must be leaa than or equal to 50 characters long.",
         "any.required": "fullName is required."

    }),
    email: joi.string().email().required().messages({
        "string.email": "Please enter a valid email address.",
        "any.required":"email is required"
    }),
    password: joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*>-])[a-zA-Z\d!@#$%^&*>-]{8,25}$/).required().messages({
        "string.pattern.base": "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.",
        "any.required": "Password is required."
    }),
    confirmPassword: joi.string().equal(joi.ref('password')).required().messages({
        "any.only": "confirmPassword must be similar to password",
         "any.required": "Confirm password is required."
    }),
    address:joi.string().allow(null,'').optional().messages({
        "string.base": "Address must be a string."
    }),
    role:joi.string().regex(/^(admin|seller|customer)$/).default('customer').messages({
        "string.pattern.base": "Role must be either 'admin', 'seller', or 'customer'.",
        "any.required": "Role is required."

    }),
    phone:joi.string().min(10).max(25).messages({
        "string.min": "Phone number must be at least 10 characters long.",
        "string.max": "Phone number can be maximum 25 characters long."
    }),
    gender:joi.string().regex(/^(male|female|other)$/).messages({
        "string.pattern.base": "Gender must be one of 'male', 'female', or 'other'."
    })
});   


const LoginUserDTO = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});




const ForgetPasswordDTO = joi.object({
    email:joi.string().email().required()
});

const ResetPasswordDTO = joi.object({
    password: joi.string().required(),
    confirmPassword: joi.string().equal(joi.ref('password')).required()
})

export {RegisterUserDTO,LoginUserDTO,ForgetPasswordDTO,ResetPasswordDTO};
