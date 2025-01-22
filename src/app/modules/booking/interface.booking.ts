import { Types } from "mongoose";

export type TBooking = {
  date: string;
  slots: [Types.ObjectId];
  room: Types.ObjectId;
  user: Types.ObjectId;
  totalAmount?: number;
  isBooked: "confirmed" | "unconfirmed" | "canceled";
  isDeleted?: boolean;
};
