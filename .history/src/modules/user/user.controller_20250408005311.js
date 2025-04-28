import userSvc from "./user.service";

class UserController {
    getAllUsers = async(req,res,next) =>{
        try {

            const {result,pagination} = userSvc.
            
        } catch (exception) {
           next(exception) 
        }
    }
}

const userCtrl = new UserController()

export default userCtrl;