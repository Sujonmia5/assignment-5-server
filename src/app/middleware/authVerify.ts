import { NextFunction, Request, Response } from "express";
import AppError from "../Error/Error";
import httpStatus from "http-status";
import Jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";
import asyncFunction from "../utils/asyncFunction";

export const auth = (...requestedRoles: string[]) => {
  return asyncFunction(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      if (!token) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "you are not unauthorized users"
        );
      }

      const decode = Jwt.verify(
        token.split(" ")[1],
        config.secret as string
      ) as JwtPayload;

      const { role } = decode;
      // console.log(requestedRoles[0], role);
      if (requestedRoles[0] !== role) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "You have no access to this route"
        );
      }
      req.user = decode;
      next();
    }
  );
};
