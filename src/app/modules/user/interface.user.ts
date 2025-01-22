import { Model } from "mongoose";

export interface TLoginUser {
  email: string;
  password: string;
}

export interface TUser extends TLoginUser {
  name: string;
  phone?: string;
  role: "user" | "admin";
  address?: string;
}

export interface TUserStatics extends Model<TUser> {
  isUserExist(email: string): Promise<TUser | null>;
}
