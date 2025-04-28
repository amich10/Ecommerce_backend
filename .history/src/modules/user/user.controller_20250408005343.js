import userSvc from "./user.service.js";

class UserController {
    getAllUsers = async(req,res,next) =>{
        try {
            let filter={}
            const {result,pagination} = userSvc.getallUsersByFilter()
            
        } catch (exception) {
           next(exception) 
        }
    }
}

const userCtrl = new UserController()

export default userCtrl;