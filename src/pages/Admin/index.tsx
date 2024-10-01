import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { AuthContextType, User } from '../../types/user';
import { AuthContext } from '../../context/auth';
import { findUserById } from '../../services/findUserById';
import { Trash } from '@phosphor-icons/react';

type UserRole = 'teacher' | 'student';

export function Admin() {
  const [users, setUsers] = useState<User[]>([]);
  const { authenticatedUser } = useContext(AuthContext) as AuthContextType;

  useEffect(() => {
    axios.get("http://localhost:3000/user").then((response) => setUsers(response.data))
  }, [])

  if (authenticatedUser?.role !== 'teacher') {
    return <h1 className="text-center text-red-500">Acesso negado. Apenas professores podem acessar esta página.</h1>;
  }

  const changeUserRole = async (id: string, newRole: UserRole) => {
    axios.patch(`http://localhost:3000/user/${id}`, {
      role: newRole,
    })
  };

  const deleteUser = (id: string) => {
    axios.delete(`http://localhost:3000/user/${id}`)
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Administração de Usuários</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Nome</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Perfil</th>
              <th className="py-2 px-4 border-b">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.role}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => changeUserRole(user.id, 'teacher')}
                    className={`bg-blue-500 text-white px-2 py-1 rounded mr-2 ${user.role === 'teacher' ? 'opacity-30 cursor-not-allowed' : ''}`}
                    disabled={user.role === 'teacher'}
                  >
                    Tornar Professor
                  </button>
                  <button
                    onClick={() => changeUserRole(user.id, 'student')}
                    className={`bg-green-500 text-white px-2 py-1 rounded mr-2 ${user.role === 'student' ? 'opacity-30 cursor-not-allowed' : ''}`}
                    disabled={user.role === 'student'}
                  >
                    Tornar Aluno
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    <Trash color='#FFF' size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
