import httpStatus from "http-status";
import AppError from "../../Error/Error";
import { MRoom } from "../room/model.room";
import { TSlot } from "./interface.slot";
import { MSlot } from "./model.slot";
import { JwtPayload } from "jsonwebtoken";
import { MUser } from "../user/model.user";
import { makeSlots } from "./utils.slots";
import QueryClass from "../../builder/QueryClass";

const createSlotIntoDB = async (payload: TSlot, user: JwtPayload) => {
  const isUserExist = await MUser.isUserExist(user.email);
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "user not founded");
  }

  const isRoomExist = await MRoom.findById(payload.room);
  if (!isRoomExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Room is not Founded");
  }
  const slots = makeSlots(payload);
  const result = await MSlot.create(slots);
  return result;
};

const getAllSlotsFromDB = async (query: Record<string, unknown>) => {
  const exCludeFields = ["date"];

  const slotQuery = new QueryClass(
    MSlot.find().populate("room"),
    query
  ).fieldFilter(exCludeFields);
  const result = await slotQuery.modelQuery;
  return result;
};

export const slotService = {
  createSlotIntoDB,
  getAllSlotsFromDB,
};
