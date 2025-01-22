import { z } from "zod";

const zodSlotValidationSchema = z
  .object({
    room: z.string({ message: "Room is required" }),
    date: z.string().transform((str) => new Date(str)),
    startTime: z
      .string({ message: "Start time is required" })
      .refine((time) => {
        const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        return regex.test(time);
      }),
    endTime: z.string({ message: "End time is required" }).refine((time) => {
      const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
      return regex.test(time);
    }),
    isBooked: z.boolean().optional(),
  })
  .strict()
  .superRefine((val, ctx) => {
    const start = new Date(`2000-01-01T${val.startTime}:00`);
    const end = new Date(`2000-01-01T${val.endTime}:00`);

    if (start > end) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "start time should be before end time",
      });
    }
  });

export { zodSlotValidationSchema };
