import axios from "axios"
import { User } from "../types/user"

async function newUser({ email, name, password, roles = [] }: User) {
  if (!email || !name || !password) {
    console.error("Email inválido")
    return undefined
  }

  const response = await axios.post("http://localhost:3000/users", {
    name,
    email,
    password,
    roles
  })

  return response.data
}

export { newUser }
