import { TUser, TUserRole } from "../types/user";

export const getUserRole = (): TUserRole | null => {
  const user = localStorage.getItem('user');
  if (user) {
    const userData: TUser = JSON.parse(user);
    return userData.role;
  }
  return null;
}