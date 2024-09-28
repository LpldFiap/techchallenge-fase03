import { TUser, TUserRole } from "../types/user";

export const getUserRole = (): TUserRole | null => {
  const user = localStorage.getItem('user');
  if (user) {
    const userData: TUser = JSON.parse(user);
    return userData.role;
  }
  return null;
}

export const getUserName = (): string | null => {
  const user = localStorage.getItem('user');
  if (user) {
    const userData: TUser = JSON.parse(user);
    return userData.name;
  }
  return null;
}

export const getUserId = (): string => {
  const user = localStorage.getItem('user');
  if (user) {
    const userData: TUser = JSON.parse(user);
    return userData._id || '';
  }
  return '';
}