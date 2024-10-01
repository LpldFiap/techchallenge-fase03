import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth';
import { AuthContextType } from '../types/user';

interface PrivateRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
}

export function PrivateRoute({ children, allowedRoles }: PrivateRouteProps) {
  const { authenticatedUser } = useContext(AuthContext) as AuthContextType;
  const role = authenticatedUser?.role

  if (!role) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
}
