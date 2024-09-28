import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { getAllUsers, getUserById } from '../../services/user.service';
import { TUser } from '../../types/user';
import { UsersContextType } from './UsersContext.types';




const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const allUsers = await getAllUsers();
      setUsers(allUsers);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUserById = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const user = await getUserById(id);
      return user;
    } catch (error) {
      console.error(`Erro ao buscar usuário com id ${id}:`, error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);
    
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <UsersContext.Provider value={{ users, loading, fetchUsers, fetchUserById }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UsersProvider');
  }
  return context;
};