/**
 * Middleware function for validating request bodies using Joi schema.
 * This is a higher-order function that returns an Express middleware.
 * 
 * @param {Object} schema - Joi validation schema
 * @returns {Function} Express middleware for validation
 */

export const bodyValidator = (schema) =>{   // Outer function
    return async (req,res,next) => {   // Inner function (closure: A closure is a function that "remembers" variables from its outer function even after the outer function has finished executing.)

        try{
            // Extract request body data
            let data= req.body;

            // Validate request data against the provided Joi schema
            // `abortEarly: false` ensures all validation errors are captured, not just the first one
            await schema.validateAsync(data, {
                abortEarly: false
            })

            // If validation passes, proceed to the next middleware or route handler
            next()
        }
        catch (exception) {
            //console.log(exception)

            // Initialize an empty object to store validation error messages
            let errBag = {}

            // Check if the exception contains validation error details
            if(exception.details){


                // Loop through all validation errors and structure them into `errBag`
                exception.details.map((error) =>{
                    console.log(error)

                     // Store error messages in `errBag`
                    errBag[error.context.label] = error.message;
                })
            }

            // Pass an error object to Express' error-handling middleware
            next({
                code:400,
                detail:errBag,
                message: "Validation failed",
                status: "VALIDATION_FAILED"
            })
        }

    }
}

// bodyValidator() => middleware