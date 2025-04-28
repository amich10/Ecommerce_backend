import BaseService from "../../services/base.service.js";
import User from "./user.model.js";

class UserService extends BaseService {
  getallUsersByFilter = async (filter = {}, query = null) => {
    try {
      const page = +query.page || 1;
      const limit = +query.limit || 10;
      const skip = (page - 1) * limit;
      const data = await User.find(filter)
        .sort({ name: "asc" })
        .skip(skip)
        .limit(limit);

      const countTotalUsers = await User.countDocuments(filter);
      console.log('users',data)

      return {
        result: data,
        pagination: {
          page: page,
          limit: limit,
          total: countTotalUsers,
        },
      };
    } catch (exception) {
      throw exception;
    }
  };
}

const userSvc = new UserService();
export default userSvc;
