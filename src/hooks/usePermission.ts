import { useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import type { PermissionModuleId, PermissionAction, PermissionScope } from '@/types/permission.types';
import { canAccess, getScope } from '@/utils/permissions';

export function usePermission() {
  const { user } = useAuth();
  
  const permissions = user?.permissions;

  const hasAccess = useCallback((module: PermissionModuleId, action: PermissionAction): boolean => {
    return canAccess(permissions, module, action);
  }, [permissions]);

  const getModuleScope = useCallback((module: PermissionModuleId): PermissionScope | undefined => {
    return getScope(permissions, module);
  }, [permissions]);

  return {
    hasAccess,
    getModuleScope,
    rawPermissions: permissions 
  };
}
