import React from 'react';
import { AuthContextType, User } from '../types/user'
import { findUserByEmail } from '../services/findUserByEmail';

export const AuthContext = React.createContext<AuthContextType | null>(null);

function AuthUserProvider({children}: { children:React.ReactNode }) {
  const [authenticatedUser, setAuthenticatedUser] = React.useState<User | null>(null)

  async function authenticateUser ({ email, password }: Pick<User, "email" | "password">): Promise<User | null> {
    const foundUser = await findUserByEmail(email)

      if (foundUser?.password === password) {
        setAuthenticatedUser(foundUser)
        return (foundUser)
      } else {
        console.log("Credenciais incorretas")
        return null
      }
  }

  return <AuthContext.Provider value={{ authenticatedUser, authenticateUser }}>{children}</AuthContext.Provider>
}

export default AuthUserProvider
