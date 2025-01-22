import httpStatus from "http-status";
import asyncFunction from "../../utils/asyncFunction";
import sendResponse from "../../utils/sendResponse";
import { slotService } from "./service.slot";

const createSlot = asyncFunction(async (req, res) => {
  const data = req.body;
  const user = req.user;
  const result = await slotService.createSlotIntoDB(data, user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "slot created successfully",
    data: result,
  });
});

const getAllSlots = asyncFunction(async (req, res) => {
  const query = req.query;

  const result = await slotService.getAllSlotsFromDB(query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Available slots retrieved successfully",
    data: result,
  });
});

export const slotController = {
  createSlot,
  getAllSlots,
};
