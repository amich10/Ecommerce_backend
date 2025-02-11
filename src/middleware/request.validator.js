export const bodyValidator = (schema) =>{   //closure function
    return async (req,res,next) => {
        try{
            //validation
            let data= req.body;
            await schema.validateAsync(data, {
                abortEarly: false
            })

            //after validation is passed
            next()
        }
        catch (exception) {
            //console.log(exception)
            let errBag = {}

            if(exception.details){

                exception.details.map((error) =>{
                    console.log(error)
                    errBag[error.context.label] = error.message;
                })
            }
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