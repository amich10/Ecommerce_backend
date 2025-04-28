import BaseService from "../../services/base.service";

class UserService extends BaseService{
    getallUsersByFilter = async(filter={},query=null)=>{
        try {

            const page = +query.page || 


        } catch (exception) {
            throw exception;
        }
    }
}

const userSvc = new UserService()
export default userSvc;