class UserController {
    getAllUsers = async(req,res,next) =>{
        try {
            
        } catch (exception) {
           next(exception) 
        }
    }
}

const userCtrl = new UserController()

export default userCtrl;