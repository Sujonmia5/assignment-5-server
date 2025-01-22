import { string, z } from "zod";

const zodRoomValidationSchema = z
  .object({
    name: z.string({ message: "Name is required" }),
    roomNo: z
      .number()
      .int()
      .positive({ message: "Room number must be a positive integer" }),
    floorNo: z
      .number()
      .int()
      .positive({ message: "Floor number must be a positive integer" }),
    capacity: z
      .number()
      .int()
      .positive({ message: "Capacity must be a positive integer" }),
    roomImgUrl: z.array(string()),
    pricePerSlot: z
      .number({ message: "slot price is required" })
      .positive({ message: "Price per slot must be a positive number" }),
    amenities: z.array(z.string({ message: "Amenity cannot be empty" })),
    isDeleted: z.boolean().optional(),
  })
  .strict();

const zodUpdatedRoomValidationSchema = zodRoomValidationSchema
  .extend({})
  .partial()
  .strict();

export { zodRoomValidationSchema, zodUpdatedRoomValidationSchema };
