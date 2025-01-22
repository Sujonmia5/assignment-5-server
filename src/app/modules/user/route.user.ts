import express from "express";
import { userController } from "./controller.user";
import requestDataValidation from "../../middleware/requestDataValidation";
import { zodUserLoginSchema, zodUserSchema } from "./validation.user";

const route = express.Router();

route.post(
  "/signup",
  requestDataValidation(zodUserSchema),
  userController.createUser
);

route.post(
  "/login",
  requestDataValidation(zodUserLoginSchema),
  userController.loginUser
);

export const userRoutes = route;
