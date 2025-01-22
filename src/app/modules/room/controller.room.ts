import httpStatus from "http-status";
import asyncFunction from "../../utils/asyncFunction";
import sendResponse from "../../utils/sendResponse";
import { roomService } from "./service.room";

const createRoom = asyncFunction(async (req, res) => {
  const data = req.body;
  const user = req.user;
  const result = await roomService.createRoomIntoDB(data, user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room added successfully",
    data: result,
  });
});

const getAllRoom = asyncFunction(async (req, res) => {
  const query = req.query;
  const result = await roomService.getAllRoomFromDB(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room retrieved  successfully",
    data: result,
  });
});
const getSingleRoom = asyncFunction(async (req, res) => {
  const id = req.params.id;
  const result = await roomService.getSingleRoomFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room retrieved  successfully",
    data: result,
  });
});

const updatedSingleRoom = asyncFunction(async (req, res) => {
  const id = req.params.id;
  const query = req.body;
  const user = req.user;

  const result = await roomService.updatedSingleRoomFromDB(id, query, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room updated successfully",
    data: result,
  });
});

const deletedSingleRoom = asyncFunction(async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  const result = await roomService.deletedSingleRoomFromDB(id, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room deleted successfully",
    data: result,
  });
});

export const roomController = {
  createRoom,
  getAllRoom,
  getSingleRoom,
  updatedSingleRoom,
  deletedSingleRoom,
};
