/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import zodErrorHandler from "../Error/zodErrorHanedler";
import { TSource } from "../interface/interface";
import { config } from "../config";
import castErrorHandler from "../Error/castErrorHandler";
import duplicateErrorHandler from "../Error/duplicateErrorHandler";
import mongooseErrorHandler from "../Error/mongooseValidation";
import AppError from "../Error/Error";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Something wrong!";
  let source: TSource = [
    {
      path: "",
      message: "Something wrong!",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = zodErrorHandler(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    source = simplifiedError.source;
  } else if (err.name === "ValidationError") {
    const simplifiedError = mongooseErrorHandler(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    source = simplifiedError.source;
  } else if (err.code === 11000) {
    const simplifiedError = duplicateErrorHandler(err);
    message = simplifiedError.message;
    statusCode = simplifiedError.statusCode;
    source = simplifiedError.source;
  } else if (err.name === "CastError") {
    const simplifiedError = castErrorHandler(err);
    message = simplifiedError.message;
    statusCode = simplifiedError.statusCode;
    source = simplifiedError.source;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    source = [
      {
        path: "",
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    source = [
      {
        path: "",
        message: err.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSource: source,
    stack: config.development === "development" ? err.stack : null,
    // err,
  });
};

export default globalErrorHandler;
