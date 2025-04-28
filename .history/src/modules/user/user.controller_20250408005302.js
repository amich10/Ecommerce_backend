class UserController {
    getAllUsers = async(req,res,next) =>{
        try {

            const {result,pagination}
            
        } catch (exception) {
           next(exception) 
        }
    }
}

const userCtrl = new UserController()

export default userCtrl;