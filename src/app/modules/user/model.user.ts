import { Schema, model } from "mongoose";
import { TUser, TUserStatics } from "./interface.user";
import { config } from "../../config";
import bcrypt from "bcrypt";

const userSchema = new Schema<TUser, TUserStatics>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

userSchema.statics.isUserExist = async function (email: string) {
  const user = await MUser.findOne({ email });
  return user;
};

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});

export const MUser = model<TUser, TUserStatics>("user", userSchema);
