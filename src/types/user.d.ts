export interface User {
  id?: string
  name: string
  email: string
  password: string
  roles: Array<"admin" | "teacher">
}
