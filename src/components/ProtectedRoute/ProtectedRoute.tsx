import { useAuth } from '@/hooks';
import { ROUTES } from '@/router';
import { Navigate } from 'react-router-dom';

export interface ProtectedRouteProps {
  children: React.ReactNode;
  loadingPage?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, loadingPage = null }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return loadingPage;
  }

  if (!user && !loading) {
    return <Navigate to={ROUTES.signin} />;
  }

  return <>{children}</>;
};
