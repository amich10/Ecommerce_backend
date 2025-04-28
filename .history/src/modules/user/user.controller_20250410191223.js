import userSvc from "./user.service.js";

class UserController {
    getAllUsers = async(req,res,next) =>{
        try {

            let loggedInUser = req.authUser;


            let filter={
                _id:{$ne:loggedInUser._id}
            }

            if(req.query.search){
                filter = {
                    ...filter,
                    $or:[
                        {name:new RegExp(req.query.search,'i')},
                        {email:new RegExp(req.query.search,'i')},
                        {phone:new RegExp(req.query.search,'i')},

                    ]
                }
            }
            const {result,pagination} = await userSvc.getallUsersByFilter(filter,req.query)
            console.log(result)
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

    getUserById = async(req,res,next) =>{
        try {
            const user = await userSvc.getSingleRow
        } catch (exception) {
            next(exception)
        }
    }
}

const userCtrl = new UserController()

export default userCtrl;