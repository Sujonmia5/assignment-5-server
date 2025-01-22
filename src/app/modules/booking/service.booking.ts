import httpStatus from "http-status";
import { MRoom } from "../room/model.room";
import { MSlot } from "../slot/model.slot";
import { MUser } from "../user/model.user";
import { TBooking } from "./interface.booking";
import { MBooking } from "./model.booking";
import AppError from "../../Error/Error";
import { JwtPayload } from "jsonwebtoken";

const createBookingIntoDB = async (payload: TBooking) => {
  const { room, slots, user } = payload;

  // user find
  const isUserExist = await MUser.findById(user);

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User is not founded");
  }
  //room find
  const isRoomExist = await MRoom.findById(room);
  if (!isRoomExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Room is not founded");
  }

  const totalAmount = isRoomExist.pricePerSlot * slots.length;

  //slots finding
  for (const id of slots) {
    const isSlotExist = await MSlot.findById(id);
    if (!isSlotExist) {
      throw new AppError(httpStatus.NOT_FOUND, `Slot is not founded`);
    }
    if (isSlotExist.isBooked) {
      throw new AppError(httpStatus.NOT_FOUND, `this Slot is already booked`);
    }
  }

  const bookingDoc = await MBooking.create({ ...payload, totalAmount });

  for (const slot of bookingDoc.slots) {
    await MSlot.findByIdAndUpdate(
      slot,
      { isBooked: true },
      {
        new: true,
      }
    );
  }

  const result = await MBooking.findById(bookingDoc._id)
    .populate("room")
    .populate("user")
    .populate("slots");

  return result;
};

const getAllBookingFromDB = async () => {
  const result = await MBooking.find()
    .populate("room")
    .populate("user")
    .populate("slots");
  return result;
};

const getMyBookingsFromDB = async (user: JwtPayload) => {
  const isUser = await MUser.findOne({ email: user.email });
  const result = await MBooking.find({ user: isUser?._id })
    .populate("room")
    .populate("slots")
    .select("-user");
  return result;
};

const updatedBookingIntoDB = async (
  id: string,
  payload: { isBooked: string }
) => {
  const result = await MBooking.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deletedBookingFromDB = async (id: string) => {
  const isDeleted = await MBooking.findById(id);
  if (isDeleted?.$isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "This room is already deleted");
  }
  const result = await MBooking.findByIdAndUpdate(
    id,
    {
      isBooked: true,
    },
    { new: true }
  );
  return result;
};
export const bookingService = {
  createBookingIntoDB,
  getAllBookingFromDB,
  getMyBookingsFromDB,
  updatedBookingIntoDB,
  deletedBookingFromDB,
};
