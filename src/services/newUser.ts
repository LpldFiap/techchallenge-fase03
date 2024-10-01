import axios from "axios"
import { User } from "../types/user"

async function newUser({ email, name, password, role = "teacher" }: Omit<User, "id">) {
  if (!email || !name || !password) {
    console.error("Email inválido")
    return undefined
  }

  const response = await axios.post("http://localhost:3000/user", {
    name,
    email,
    password,
    role
  })

  return response.data
}

export { newUser }
