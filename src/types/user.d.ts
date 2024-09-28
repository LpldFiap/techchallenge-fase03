export interface User {
  id?: string
  name: string
  email: string
  password: string
  roles: Array<"admin" | "teacher">
}

export type AuthContextType = {
  authenticatedUser: User | null
  authenticateUser: ({ email:string, password: string}) => Promise<User | null>
}
