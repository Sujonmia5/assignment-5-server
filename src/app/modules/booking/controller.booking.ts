import httpStatus from "http-status";
import asyncFunction from "../../utils/asyncFunction";
import sendResponse from "../../utils/sendResponse";
import { bookingService } from "./service.booking";

const createBooking = asyncFunction(async (req, res) => {
  const data = req.body;
  const result = await bookingService.createBookingIntoDB(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking created successfully",
    data: result,
  });
});

const getAllBooking = asyncFunction(async (req, res) => {
  const result = await bookingService.getAllBookingFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking created successfully",
    data: result,
  });
});
const getMyBookings = asyncFunction(async (req, res) => {
  const user = req.user;
  const result = await bookingService.getMyBookingsFromDB(user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking created successfully",
    data: result,
  });
});
const updatedBooking = asyncFunction(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await bookingService.updatedBookingIntoDB(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking created successfully",
    data: result,
  });
});

const deletedBooking = asyncFunction(async (req, res) => {
  const id = req.params.id;
  const result = await bookingService.deletedBookingFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking created successfully",
    data: result,
  });
});

export const bookingController = {
  createBooking,
  getAllBooking,
  getMyBookings,
  updatedBooking,
  deletedBooking,
};
