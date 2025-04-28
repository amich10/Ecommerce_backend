import BaseService from "../../services/base.service";

class UserService extends BaseService{
    getallUsersByFilter = async(filter={},query=null)=>{
        try {

            const page = +query.page || 1;
            


        } catch (exception) {
            throw exception;
        }
    }
}

const userSvc = new UserService()
export default userSvc;