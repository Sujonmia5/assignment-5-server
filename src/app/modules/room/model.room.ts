import { Schema, model } from "mongoose";
import { TRoom } from "./interface.room";

const roomSchema = new Schema<TRoom>(
  {
    name: {
      type: String,
      required: true,
    },
    roomNo: {
      type: Number,
      required: true,
    },
    floorNo: {
      type: Number,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    roomImgUrl: {
      type: [String],
      required: true,
    },
    pricePerSlot: {
      type: Number,
      required: true,
    },
    amenities: {
      type: [String],
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

roomSchema.pre("find", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

roomSchema.pre("findOne", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// Create the Mongoose model
export const MRoom = model<TRoom>("room", roomSchema);
