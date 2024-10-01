export interface User {
  id: string
  name: string
  email: string
  password: string
  role: "admin" | "teacher" | "student"
}

export type AuthContextType = {
  authenticatedUser: User | null
  authenticateUser: ({ email:string, password: string}) => Promise<User | null>
}
