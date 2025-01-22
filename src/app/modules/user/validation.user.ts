import { z } from "zod";

const zodUserSchema = z.object({
  name: z.string({ message: "Name is required" }),
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  phone: z.string({ message: "Phone number is required" }),
  password: z.string({ message: "Password is required" }),
  role: z
    .enum(["user", "admin"], {
      message: "Role must be either 'user' or 'admin'",
    })
    .optional(),
  address: z.string({ message: "Address is required" }),
});

const zodUserLoginSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string({ message: "Password is required" }),
});

export { zodUserSchema, zodUserLoginSchema };
