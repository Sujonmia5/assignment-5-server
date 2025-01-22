import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import asyncFunction from "../utils/asyncFunction";

const requestDataValidation = (schema: AnyZodObject) => {
  return asyncFunction(
    async (req: Request, res: Response, next: NextFunction) => {
      const body = req.body;
      await schema.parseAsync(body);
      next();
    }
  );
};

export default requestDataValidation;
