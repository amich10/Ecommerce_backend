import userSvc from "./user.service.js";

class UserController {
    getAllUsers = async(req,res,next) =>{
        try {
            let filter={}
            const {result,pagination} = userSvc.getallUsersByFilter(filter,req.query)
            res.json({
                data:result,
                message:""
            })
            
        } catch (exception) {
           next(exception) 
        }
    }
}

const userCtrl = new UserController()

export default userCtrl;