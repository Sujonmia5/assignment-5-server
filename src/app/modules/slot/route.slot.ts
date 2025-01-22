import express from "express";
import requestDataValidation from "../../middleware/requestDataValidation";
import { zodSlotValidationSchema } from "./validation.slot";
import { slotController } from "./controller.slot";
import { auth } from "../../middleware/authVerify";
import { UserRole } from "../../utils/constant";
import { AnyZodObject } from "zod";
const route = express.Router();

route.post(
  "/",
  auth(UserRole.admin),
  requestDataValidation(zodSlotValidationSchema._def.schema as AnyZodObject),
  slotController.createSlot
);
route.get("/availability", slotController.getAllSlots);

export const slotRoutes = route;
