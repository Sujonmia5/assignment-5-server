import mongoose from "mongoose";
import { TGenericErrorResponse } from "../interface/interface";

const castErrorHandler = (
  err: mongoose.Error.CastError
): TGenericErrorResponse => {
  const source = [
    {
      path: err.path,
      message: err.message,
    },
  ];
  return {
    statusCode: 400,
    message: "Invalid Id",
    source,
  };
};

export default castErrorHandler;
