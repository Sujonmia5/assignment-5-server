import jwt from "jsonwebtoken";
import { config } from "../../config";

export const createToken = (jwtData: { email: string; role: string }) => {
  const token = jwt.sign(
    {
      email: jwtData.email,
      role: jwtData.role,
    },
    config.secret as string,
    {
      expiresIn: "10d",
    }
  );
  return token;
};
