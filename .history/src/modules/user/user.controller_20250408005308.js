class UserController {
    getAllUsers = async(req,res,next) =>{
        try {

            const {result,pagination} = use
            
        } catch (exception) {
           next(exception) 
        }
    }
}

const userCtrl = new UserController()

export default userCtrl;