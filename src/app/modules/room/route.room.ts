import express from "express";
import requestDataValidation from "../../middleware/requestDataValidation";
import {
  zodRoomValidationSchema,
  zodUpdatedRoomValidationSchema,
} from "./validation.room";
import { roomController } from "./controller.room";
import { auth } from "../../middleware/authVerify";
import { UserRole } from "../../utils/constant";
const route = express.Router();

route.post(
  "/create-room",
  auth(UserRole.admin),
  requestDataValidation(zodRoomValidationSchema),
  roomController.createRoom
);
route.put(
  "/:id",
  auth(UserRole.admin),
  requestDataValidation(zodUpdatedRoomValidationSchema),
  roomController.updatedSingleRoom
);
route.delete("/:id", auth(UserRole.admin), roomController.deletedSingleRoom);

route.get("/", roomController.getAllRoom);
route.get("/:id", roomController.getSingleRoom);

export const roomsRoutes = route;
