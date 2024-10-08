import 'tailwindcss/tailwind.css';
import { useEffect, useState } from 'react';
import { useUsers } from '../../context/Users/UsersContext';
import { TUserRole } from '../../types/user';
import { deleteUser, getUserId, getUserRole, updateUser } from '../../services/user.service';
import LoadingComponent from '../../components/LoadingComponent';

export default function Admin() {
  const [role, setRole] = useState<TUserRole | null>(null);
  const { users, loading, fetchUsers } = useUsers();  
  
  const changeUserRole = async ({ id, newRole }: { id?: string, newRole: TUserRole }) => {
    if (!id) return;
    const userData = users.find(user => user._id === id);
    if (!userData) return;
    userData.role = newRole
    try {
      await updateUser({id, userData});
    }catch (error) {
      console.error('Erro ao alterar o perfil do usuário:', error);
    } finally {
      fetchUsers();
    }
  };
  
  const handleDeleteUser = async (id?: string) => {
    if (!id) return;
    try {
      const user_id = getUserId();
      await deleteUser({ id, user_id });
    } catch (error) {
      console.error('Erro ao deletar o usuário:', error);
    } finally {
      fetchUsers();
    }

  };
  
  useEffect(() => {
    const userRole = getUserRole();
    if (userRole) {
      setRole(userRole);
    }
  }, [role]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers])
  
  if (role !== 'teacher') {
    return <h1 className="text-center text-red-500">Acesso negado. Apenas professores podem acessar esta página.</h1>;
  }
  if (loading) {
    return <LoadingComponent />;
  }

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
              <tr key={user._id}>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.role}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => changeUserRole({id: user._id, newRole:'teacher'})}
                    className={`bg-blue-500 text-white px-2 py-1 rounded mr-2 ${user.role === 'teacher' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={user.role === 'teacher'}
                  >
                    Tornar Professor
                  </button>
                  <button
                    onClick={() => changeUserRole({id: user._id, newRole:'student'})}
                    className={`bg-green-500 text-white px-2 py-1 rounded mr-2 ${user.role === 'student' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={user.role !== 'teacher'}
                  >
                    Tornar Aluno
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
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