import BaseService from "../../services/base.service";

class UserService extends BaseService{
    getallUsersByFilter(filter:{},query:null) {
        try {
            // Add your logic here
        } catch (exception) {
            throw exception;
        }
    }
}

const userSvc = new UserService()
export default userSvc;