import mongoose from "mongoose";
import { TGenericErrorResponse, TSource } from "../interface/interface";

const mongooseErrorHandler = (
  err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const source: TSource = Object.values(err.errors).map((value) => {
    return {
      path: value.path,
      message: value.message,
    };
  });

  return {
    statusCode: 400,
    message: "Validation Error",
    source,
  };
};

export default mongooseErrorHandler;
