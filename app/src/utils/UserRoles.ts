import { User } from "../models/User";

const roles = ["student", "company", "bedkom", "bedkom-admin", "super-admin"];

export const isPermitted = (user: User, minRole: string): boolean => {
  // Compare users role to minimum role.
  const role = user.role;
  if (role === minRole) {
    return true;
  }
  const aIdx = roles.indexOf(role);
  const bIdx = roles.indexOf(minRole);
  return aIdx > bIdx;
};

export default roles;
