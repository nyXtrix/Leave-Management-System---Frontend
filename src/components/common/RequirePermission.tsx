import React from 'react';
import { usePermission } from '@/hooks/usePermission';
import type { PermissionModuleId, PermissionAction } from '@/types/permission.types';

interface RequirePermissionProps {
  module: PermissionModuleId;
  action: PermissionAction;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const RequirePermission: React.FC<RequirePermissionProps> = ({
  module,
  action,
  children,
  fallback = null
}) => {
  const { hasAccess } = usePermission();

  if (!hasAccess(module, action)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
