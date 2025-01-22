import httpStatus from "http-status";
import AppError from "../../Error/Error";
import { TRoom } from "./interface.room";
import { MRoom } from "./model.room";
import { JwtPayload } from "jsonwebtoken";
import { MUser } from "../user/model.user";
import QueryClass from "../../builder/QueryClass";

const createRoomIntoDB = async (payload: TRoom, user: JwtPayload) => {
  const isUserExist = await MUser.isUserExist(user.email);
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "user not founded");
  }

  const result = await MRoom.create(payload);
  return result;
};

const getAllRoomFromDB = async (query: Record<string, unknown>) => {
  const exCludeFields = ["search", "limit", "page", "sort"];
  const searchAbleField = ["name", "amenities"];

  const roomQuery = new QueryClass(MRoom.find(), query)
    .search(searchAbleField)
    .filter(exCludeFields)
    .field()
    .paginate()
    .sort();

  const result = await roomQuery.modelQuery;
  return result;
};

const getSingleRoomFromDB = async (id: string) => {
  const result = await MRoom.findById(id);
  return result;
};

const updatedSingleRoomFromDB = async (
  id: string,
  payload: Partial<TRoom>,
  user: JwtPayload
) => {
  const { amenities, ...remainingData } = payload;

  const isUserExist = await MUser.isUserExist(user.email);
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "user not founded");
  }

  let amenitiesData: string[] = [];

  if (amenities?.length) {
    amenitiesData = amenities;
  }

  const isRoomExist = await MRoom.findById(id).select("isDeleted");

  if (!isRoomExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Room not founded");
  }
  const result = await MRoom.findByIdAndUpdate(
    id,
    {
      ...remainingData,
      $addToSet: {
        amenities: { $each: amenitiesData },
      },
    },
    {
      upsert: true,
      new: true,
    }
  );

  return result;
};

const deletedSingleRoomFromDB = async (id: string, user: JwtPayload) => {
  const isUserExist = await MUser.isUserExist(user.email);

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "user not founded");
  }

  const result = await MRoom.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );

  return result;
};
export const roomService = {
  createRoomIntoDB,
  getAllRoomFromDB,
  updatedSingleRoomFromDB,
  getSingleRoomFromDB,
  deletedSingleRoomFromDB,
};
