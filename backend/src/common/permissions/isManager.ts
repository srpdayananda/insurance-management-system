import User from "../../user/user.model";
import { RoleEnum } from "../enums/role";

export default async function isManager(id: string) {
  const user = await User.findById(id);
  if (user.role === RoleEnum.MANAGER) {
    return true;
  }
  return false;
}
