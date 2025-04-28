import userSvc from "./user.service.js";

class UserController {
    getAllUsers = async(req,res,next) =>{
        try {

            let loggedInUser = req.authUser;


            let filter={
                _id:{$ne:loggedInUser_id}
            }

            if(req.query.search){
                filter = {
                    ...filter
                }
            }
            const {result,pagination} = userSvc.getallUsersByFilter(filter,req.query)
            res.json({
                data:result,
                message:"Total users list",
                status:"USER_LIST",
                options:{
                    pagination
                }
            })
            
        } catch (exception) {
           next(exception) 
        }
    }
}

const userCtrl = new UserController()

export default userCtrl;