import { User } from "../types/user"
import api from "../api"

export const newUser = async ({ email, name, password, role }: User) => {
  if (!email || !name || !password) {
    console.error("Email inválido")
    return undefined
  }

  const response = await api.post(`users`, {
    name,
    email,
    password,
    role
  })

  return response.data
}

