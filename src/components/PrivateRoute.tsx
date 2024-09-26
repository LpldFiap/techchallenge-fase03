import { Navigate } from 'react-router-dom';
import { checkAuth } from '../utils/auth';

interface PrivateRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
}

export function PrivateRoute({ children, allowedRoles }: PrivateRouteProps) {
  const role = checkAuth();

  if (!role) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
}