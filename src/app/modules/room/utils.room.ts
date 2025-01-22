import { MUser } from "../user/model.user";

export const isUserExist = async (email: string) => {
  const user = await MUser.isUserExist(email);
  return user;
};
