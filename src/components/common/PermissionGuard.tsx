import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { usePermission } from '@/hooks/usePermission';
import type { PermissionModuleId, PermissionAction } from '@/types/permission.types';

interface ProtectedRouteProps {
  moduleId: PermissionModuleId;
  action?: PermissionAction;
  children: React.ReactNode;
  fallbackRoute?: string;
}

export const PermissionGuard: React.FC<ProtectedRouteProps> = ({ 
  moduleId, 
  action = 'VIEW', 
  children,
  fallbackRoute = '/unauthorized' 
}) => {
  const { hasAccess } = usePermission();
  const location = useLocation();

  if (!hasAccess(moduleId, action)) {
    return <Navigate to={fallbackRoute} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
