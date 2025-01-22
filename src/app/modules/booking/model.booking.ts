import { Schema, model } from "mongoose";
import { TBooking } from "./interface.booking";

const bookingSchema = new Schema<TBooking>(
  {
    date: {
      type: String,
      required: true,
    },
    slots: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "slot",
      },
    ],
    room: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "room",
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    totalAmount: {
      type: Number,
    },
    isBooked: {
      type: String,
      enum: ["confirmed", "unconfirmed", "canceled"],
      default: "unconfirmed",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const MBooking = model<TBooking>("booking", bookingSchema);
