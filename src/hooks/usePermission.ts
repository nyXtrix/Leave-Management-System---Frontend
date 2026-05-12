import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import type { PermissionModuleId, PermissionAction, PermissionScope } from '@/types/permission.types';
import { canAccess, getScope } from '@/utils/permissions';

export function usePermission() {
  const permissions = useSelector((state: RootState) => state.user.profile?.permissions);

  const hasAccess = useCallback((
    module: PermissionModuleId | PermissionModuleId[], 
    action: PermissionAction | PermissionAction[]
  ): boolean => {
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

export function useModulePermissions(module: PermissionModuleId) {
  const { hasAccess } = usePermission();

  return {
    canView: hasAccess(module, "VIEW"),
    canCreate: hasAccess(module, "CREATE"),
    canUpdate: hasAccess(module, "UPDATE"),
    canDelete: hasAccess(module, "DELETE"),
    canApprove: hasAccess(module, "APPROVE"),
    canReject: hasAccess(module, "REJECT"),
  };
}
