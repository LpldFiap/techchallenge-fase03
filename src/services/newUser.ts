import axios from "axios"
import { User } from "../types/user"
import api from "../api"

export const newUser = async ({ email, name, password, roles = [] }: User) => {
  if (!email || !name || !password) {
    console.error("Email inválido")
    return undefined
  }

  const response = await axios.post(`${api}users`, {
    name,
    email,
    password,
    roles
  })

  return response.data
}

