/* eslint-disable @typescript-eslint/no-explicit-any */
import { TGenericErrorResponse } from "../interface/interface";

const duplicateErrorHandler = (err: any): TGenericErrorResponse => {
  const message = `This email address ${
    err.message.match(/{ email: "(.*)" }/)[1]
  } is already in use.`;

  return {
    statusCode: 400,
    message,
    source: [
      {
        path: "",
        message,
      },
    ],
  };
};

export default duplicateErrorHandler;
