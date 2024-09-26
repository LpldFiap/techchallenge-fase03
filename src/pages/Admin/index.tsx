import { useState } from 'react';
import 'tailwindcss/tailwind.css';

type UserRole = 'teacher' | 'student';

interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

const mockUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'student' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'teacher' },
];

export function Admin() {
  const [role, setRole] = useState<UserRole>('teacher'); // Simulação de autenticação
  const [users, setUsers] = useState<User[]>(mockUsers);

  if (role !== 'teacher') {
    return <h1 className="text-center text-red-500">Acesso negado. Apenas professores podem acessar esta página.</h1>;
  }

  const changeUserRole = (id: number, newRole: UserRole) => {
    setUsers(users.map(user => (user.id === id ? { ...user, role: newRole } : user)));
  };

  const deleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
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
                    className={`bg-blue-500 text-white px-2 py-1 rounded mr-2 ${user.role === 'teacher' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={user.role === 'teacher'}
                  >
                    Tornar Professor
                  </button>
                  <button
                    onClick={() => changeUserRole(user.id, 'student')}
                    className={`bg-green-500 text-white px-2 py-1 rounded mr-2 ${user.role === 'student' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={user.role === 'student'}
                  >
                    Tornar Aluno
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Deletar
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