import BaseService from "../../services/base.service";
import User from "./user.model";

class UserService extends BaseService{
    getallUsersByFilter = async(filter={},query=null)=>{
        try {

            const page = +query.page || 1;
            const limit = +query.limit || 10;
            const skip = (page - 1) * limit;
            const data = await User.find(filter)
            .sort({name:"asc"})
            .sk


        } catch (exception) {
            throw exception;
        }
    }
}

const userSvc = new UserService()
export default userSvc;