import React from 'react';
import { AuthContextType, TUserRole, User } from '../types/user'
import { findUserByEmail } from '../services/findUserByEmail';
import { saveUser } from '../utils/auth';

export const AuthContext = React.createContext<AuthContextType | null>(null);

function AuthUserProvider({ children }: { children: React.ReactNode }) {
  const [authenticatedUser, setAuthenticatedUser] = React.useState<User | null>(null);

  const authenticateUser = React.useCallback(async ({ email, password }: Pick<User, "email" | "password">): Promise<User | null> => {
    const foundUser = await findUserByEmail(email, password);

    if (foundUser) {
      setAuthenticatedUser(foundUser);
      const user = {
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role as TUserRole,
        _id: foundUser._id
      }
      saveUser(user);
      return foundUser;
    } else {
      console.error("Error login: User not found");
      return null;
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authenticatedUser, authenticateUser }}>
      {children}
    </AuthContext.Provider>
  );
}


export default AuthUserProvider
