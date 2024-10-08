import { TUser } from "../types/user";

export function checkAuth() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user && user.email) {
    return user.role; // Retorna o perfil do usuário (teacher ou student)
  }
  return null; // Usuário não está logado
}

export function saveUser({ name, email, role, _id }: TUser) {
  const user = { name, email, role, _id };
  localStorage.setItem('user', JSON.stringify(user));
}