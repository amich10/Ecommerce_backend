import { appConfig, userStatus } from "../../config/constants.js";
import { randomStringGenerator } from "../../utils/helpers.js";
import authSvc from "./auth.service.js";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

class AuthController {
  registerUser = async (req, res, next) => {
    try {
      const userData = await authSvc.userRegisterTransformer(req);

      //DB store
      const userObj = await authSvc.userStore(userData);
      console.log(userObj)

      // decrypt and compare the passsword
      // let match = bcrypt.compareSync(data.confirmPassowrd, data.password)
      // console.log(match)

      //TODO: Email operation

      // removed await  for faster processing of time and sets email operation in the backgeround
      authSvc.notifyActivationEmal({
        name: userObj.name,
        email: userObj.email,
        activationToken: userObj.activationToken,
      });

      //link:https://<domain>/activate/token

      res.json({
        data: authSvc.publicUserProfile(userObj),
        message: " User register success call",
        status: "OK",
        options: null,
      });
    } catch (exception) {
      console.log(exception)
      next(exception);
    }
  };

  activateUser = async (req, res, next) => {
    try {
      let token = req.params.token || null;
      if (!token) {
        throw {
          code: 422,
          message: "Activation token is expected",
          status: "ACTIVATION TOKEN MISSING",
        };
      }
      // Find user with this activation token
      const associatedUser = await authSvc.getSingleUserByFilter({
        activationToken: token,
      });
      console.log("Associated user found:", associatedUser);

      if (!associatedUser) {
        return next({
          code: 422,
          message: "Token already used or does not exist",
          status: "ACTIVATION_TOKEN_NOT_FOUND",
        });
      }

      // Activate account
      let userData = {
        status: userStatus.ACTIVE,
        activationToken: null,
      };

      // Update user status
      await authSvc.updateSingleUserByFilter(
        { _id: associatedUser._id },
        userData
      );

      // Send response and ensure it's the last operation
      return res.json({
        data: null,
        message:
          "Thank you for registering with us. Your account has been successfully activated. Please login to continue.",
        status: "ACTIVATION_SUCCESS",
        options: null,
      });
    } catch (exception) {
      return next(exception);
    }
  };

  userLogin = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await authSvc.getSingleUserByFilter({
        email: email,
      });

      if (!user) {
        throw {
          code: 422,
          message: "User doesnot exist",
          status: "USER_NOT_FOUND",
        };
      } else if (!bcrypt.compareSync(password, user.password)) {
        throw {
          code: 403,
          message: "Credential doesnot match",
          status: "CREDENTIAL_DOESNOT_MATCH",
        };
      } else {
        //TODO: JWT Createand return user

        let accessToken = jwt.sign(
          {
            sub: user._id,
            typ: "access",
          },
          appConfig.jwtSecret,
          {
            expiresIn: "3 hours",
          }
        );

        let refreshToken = jwt.sign(
          {
            sub: user._id,
            typ: "refresh",
          },
          appConfig.jwtSecret,
          {
            expiresIn: "1 day",
          }
        );

        res.json({
          data: {
            accessToken: accessToken,
            refreshToken: refreshToken,
          },
          message: "logged in successfully",
          status: "SUCCESSFUL_LOGIN",
          options: null,
        });
      }
    } catch (exception) {
      next(exception);
    }
  };

  getUserProfile = (req, res, next) => {
    res.json({
      data: req.authUser,
      status: "Logged User",
      message: "Your profile",
      options: "null",
    });
  };

  forgetPassword = async (req, res, next) => {
    try {
      const { email } = req.body;

      const user = await authSvc.getSingleUserByFilter({
        email: email,
      });

      if (!user) {
        next({
          code: 400,
          detail: {
            email: "User email hasnot been registered yet!",
          },
          message: "user not found",
          status: "USER_NOT_FOUND",
        });
      }

      //if user exists, generate token and expiry time for forget password
      let updateData = {
        forgetPasswordToken: randomStringGenerator(100),
        expiryDate: new Date(Date.now() + 60 * 60 * 1000), //60 min 60 sec 1000 millisec ==> 1 hr
      };

      //now update the data

      await authSvc.updateSingleUserByFilter(
        {
          email: email,
        },
        updateData
      );

      //notify the user
      await authSvc.notifyForgetPasswordEmail({
        name: user.name,
        email: user.email,
        forgetPaswwordToken: updateData.forgetPasswordToken,
      });

      res.json({
        data: null,
        message:
          "A link has been forwared to your registered email to reset your password",
        status: "FORGET_PASSWORD_LINK_SENT",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  verifyForgetPasswordToken = async (req, res, next) => {
    try {
      let token = req.params.token;
      let user = await authSvc.getSingleUserByFilter({
        forgetPasswordToken: token,
      });

      if (!user) {
        next({
          code: 422,
          message: "Token does not exits or already used",
          status: "TOKEN_NOT_FOUND",
        });
      }
      
      const tokenExpiry = user.expiryDate.getTime(); //returns timestamp interms of milisecond
      const currentTime = Date.now(); // current time in milliseconds

      if (currentTime >= tokenExpiry) {
        return next({
          code: 422,
          message: "Password reset token expired",
          status: "PASSWORD_RESET_TOKEN_EXPIRED",
        });
      }

      //token should be used only once when clikced so it should be made broken

      const verifyToken = randomStringGenerator(100); //internal => doesnot arise in frontend => ACTS AS A otp
      await authSvc.updateSingleUserByFilter(
        {
          _id: user._id,
        },
        {
          forgetPasswordToken: verifyToken,
        }
      );
      res.json({
        data: {
          verificationToken: verifyToken,
        },
        message: "Token verified",
        status: "FORGET_PASSWORD_TOKEN_VERIFIED",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  resetPassword = async (req, res, next) => {
    try {
      const { token, password } = req.body;
      const user = await authSvc.getSingleUserByFilter({
        forgetPasswordToken: token,
      });

      if (!user) {
        next({
          code: 422,
          message: "Token doesnot exist or already used",
          status: "TOOKEN_NOT_FOUND",
        });
      }

      //update data after password reset
      const data = {
        forgetPasswordToken: null,
        expiryDate: null,
        password: bcrypt.hashSync(password, 12),
        status: userStatus.ACTIVE,
      };

      await authSvc.updateSingleUserByFilter(
        {
          _id: user._id,
        },
        data
      );

      res.status(201).json({
        data: null,
        message: "Your password has been reset successfully",
        status: "PASSWORD_RESET_SUCCESS",
        options: null,
      });
    } catch (exception) {
      next();
    }
  };
}

const authCtrl = new AuthController();

export default authCtrl;
