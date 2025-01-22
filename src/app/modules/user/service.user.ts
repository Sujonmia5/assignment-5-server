import httpStatus from "http-status";
import AppError from "../../Error/Error";
import { TLoginUser, TUser } from "./interface.user";
import { MUser } from "./model.user";
import bcrypt from "bcrypt";
import { createToken } from "./utils.user";

const createUserIntoDB = async (payload: TUser) => {
  const useInfo: TUser = { ...payload, role: "user" };
  const result = await MUser.create(useInfo);
  return result;
};

const loginUserFromDB = async (payload: TLoginUser) => {
  const { email, password } = payload;

  const isUserExists = await MUser.findOne({ email }).select("+password");
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User not founded");
  }

  const isPassword = await bcrypt.compare(password, isUserExists.password);
  if (!isPassword) {
    throw new AppError(httpStatus.NOT_FOUND, "Password did not match");
  }

  const token = createToken({
    email: isUserExists.email,
    role: isUserExists.role,
  });

  return {
    token,
    isUserExists,
  };
};

export const userServices = {
  createUserIntoDB,
  loginUserFromDB,
};
