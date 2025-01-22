import express from "express";
import requestDataValidation from "../../middleware/requestDataValidation";
import {
  zodBookingSchema,
  zodUpdatedBookingSchema,
} from "./validation.booking";
import { bookingController } from "./controller.booking";
import { auth } from "../../middleware/authVerify";
import { UserRole } from "../../utils/constant";

const route = express.Router();

route.post(
  "/",
  auth(UserRole.user),
  requestDataValidation(zodBookingSchema),
  bookingController.createBooking
);

route.get("/", auth(UserRole.admin), bookingController.getAllBooking);

route.put(
  "/:id",
  auth(UserRole.admin),
  requestDataValidation(zodUpdatedBookingSchema),
  bookingController.updatedBooking
);

route.delete("/:id", auth(UserRole.admin), bookingController.deletedBooking);

export const bookingRoutes = route;

// route 2 for users my-bookings get
export const routeUser = express.Router();

routeUser.get(
  "/my-bookings",
  auth(UserRole.user),
  bookingController.getMyBookings
);
