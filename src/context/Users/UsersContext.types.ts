import { TUser } from "../../types/user";

export type UsersContextType = {
  users: TUser[];
  loading: boolean;
  fetchUsers: () => void;
  fetchUserById: (id: string) => Promise<TUser | null>;
}