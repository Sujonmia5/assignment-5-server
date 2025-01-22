import sendResponse from "../../utils/sendResponse";
import https_status from "http-status";
import asyncFunction from "../../utils/asyncFunction";
import { userServices } from "./service.user";

// user create controller
const createUser = asyncFunction(async (req, res) => {
  const data = req.body;
  const result = await userServices.createUserIntoDB(data);
  sendResponse(res, {
    statusCode: https_status.OK,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

// user login controller
const loginUser = asyncFunction(async (req, res) => {
  const data = req.body;
  const result = await userServices.loginUserFromDB(data);
  const { isUserExists, token } = result;
  sendResponse(res, {
    statusCode: https_status.OK,
    success: true,
    message: "User logged in successfully",
    token: token,
    data: isUserExists,
  });
});

//export user all controllers with object
export const userController = {
  createUser,
  loginUser,
};
