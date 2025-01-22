import { ZodError, ZodIssue } from "zod";
import { TGenericErrorResponse, TSource } from "../interface/interface";

const zodErrorHandler = (err: ZodError): TGenericErrorResponse => {
  // console.log(err);
  const source: TSource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue?.path.length - 1] || "",
      message: issue.message,
    };
  });
  return {
    statusCode: 400,
    message: "Validation Error",
    source,
  };
};

export default zodErrorHandler;
