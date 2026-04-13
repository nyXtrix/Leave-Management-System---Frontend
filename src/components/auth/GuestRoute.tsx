import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Loader from '@/components/common/Loader';

interface Props {
  children: ReactNode;
}

export const GuestRoute = ({ children }: Props) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader fullPage />
      </div>
    );
  }

  if (isAuthenticated && user) {
    return <Navigate to={`/${user.subdomain}/dashboard`} replace />;
  }

  return <>{children}</>;
};
