import { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { getUser, updateUser } from '../../services/user.service';
import LoadingComponent from '../../components/LoadingComponent';

export default function UserProfile() {
  const user = getUser();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');


  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !newPassword || !confirmNewPassword) {
      alert('Preencha todos os campos');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      alert('As senhas não coincidem');
      return;
    }
    setIsLoading(true);
    try {
      await updateUser({ id: user._id, userData: { name, email, password: newPassword, role: user.role } });
      alert('Perfil atualizado com sucesso');
    }catch(err){
      console.error('Erro ao atualizar perfil', err);
    }finally{
      setIsLoading(false);
    }
  };

if(isLoading) return <LoadingComponent />

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="bg-white shadow-md p-6 rounded w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Configuração de Perfil</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Nova Senha</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirme a Nova Senha</label>
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
            Atualizar Perfil
          </button>
        </form>
      </div>
    </div>
  );
}