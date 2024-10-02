import axios from "axios"
import { User } from "../types/user"
import api from "../api";

export function findUserByEmail(email: string): Promise<User | undefined> {
  return axios
    .get(`${api}user?email=${email}`)
    .then(response => {
      return response.data[0] as User
    })
    .catch(error => {
      console.error("Error while trying to find user by email: ", error)
      return undefined
    });
}
