import { z } from "zod";

const zodBookingSchema = z.object({
  date: z.string({ message: "Date is required." }).refine(
    (date) => {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      return regex.test(date);
    },
    { message: "Invalid date format, valid format is YYYY-MM-DD" }
  ),
  slots: z.array(z.string({ message: "At least one slot is required." })),
  room: z.string({ message: "Room id is required." }),
  user: z.string({ message: "User id is required." }),
  isBooked: z.enum(["confirmed", "unconfirmed", "canceled"]).optional(),
});

const zodUpdatedBookingSchema = z.object({
  isBooked: z.enum(["confirmed", "unconfirmed", "canceled"]),
});

export { zodBookingSchema, zodUpdatedBookingSchema };
