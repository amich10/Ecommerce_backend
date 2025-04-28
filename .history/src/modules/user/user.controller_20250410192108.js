import userSvc from "./user.service.js";

class UserController {
  getAllUsers = async (req, res, next) => {
    try {
      let loggedInUser = req.authUser;

      let filter = {
        _id: { $ne: loggedInUser._id },
      };

      if (req.query.search) {
        filter = {
          ...filter,
          $or: [
            { name: new RegExp(req.query.search, "i") },
            { email: new RegExp(req.query.search, "i") },
            { phone: new RegExp(req.query.search, "i") },
          ],
        };
      }
      const { result, pagination } = await userSvc.getallUsersByFilter(
        filter,
        req.query
      );
      console.log(result);
      res.json({
        data: result.map((user) => userSvc.publicUserProfile(user)),
        message: "Total users list",
        status: "USER_LIST",
        options: {
          pagination,
        },
      });
    } catch (exception) {
      next(exception);
    }
  };

  getUserById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = await userSvc.getSingleRow({
        _id: id,
      });
      if (!user) {
        throw {
          code: 404,
          message: "user not found",
          status: "USER_NOT_FOUND",
        };
      }
      res.json({
        data: userSvc.publicUserProfile(user),
        message: "Single user data",
        status: "USER_DATA",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };
}

const userCtrl = new UserController();

export default userCtrl;
