import { type AppPermissions, type PermissionModuleId, type PermissionAction, PermissionScope } from '@/types/permission.types';

/**
 * @param permissions The AppPermissions object attached to the current user
 * @param module The literal ID of the Module (e.g. 'EMPLOYEE_MGMT')
 * @param action The specific action required (e.g. 'VIEW', 'CREATE')
 * @returns boolean indicating if the action is included in the user's permissions array for that module
 */
export function canAccess(
  permissions: AppPermissions | undefined | null, 
  module: PermissionModuleId, 
  action: PermissionAction
): boolean {
  if (!permissions) return false;
  
  const modulePerms = permissions[module];
  if (!modulePerms || !modulePerms.actions) return false;
  
  return modulePerms.actions.includes(action);
}

/**
 * Retrieves the authorization scope boundary mapped to a user's module access.
 *
 * @param permissions The AppPermissions object attachedAW to the current user
 * @param module The literal ID of the Module
 * @returns PermissionScope ('self', 'team', 'all') or undefined if the module isn't present
 */
export function getScope(
  permissions: AppPermissions | undefined | null, 
  module: PermissionModuleId
): PermissionScope | undefined {
  if (!permissions) return undefined;
  
  const modulePerms = permissions[module];
  return modulePerms?.scope;
}

/**
 * Transforms UI flat permission state into the structured AppPermissions DTO
 * for backend synchronization.
 * 
 * @param flatPermissions Array of strings like ["POLICY:VIEW", "POLICY:CREATE"]
 * @param scopes Record of module scopes like { POLICY: 1, ... }
 * @returns Structured AppPermissions object
 */
export const transformToAppPermissions = (
  flatPermissions: string[],
  scopes: Record<string, PermissionScope | "">
): AppPermissions => {
  const structured: AppPermissions = {};

  flatPermissions.forEach((perm) => {
    const [moduleId, action] = perm.split(":") as [PermissionModuleId, PermissionAction];
    
    const scopeValue = scopes[moduleId];
    const scope = typeof scopeValue === 'number' ? scopeValue : PermissionScope.ALL;

    if (!structured[moduleId]) {
      structured[moduleId] = {
        actions: [],
        scope: scope,
      };
    }
    
    structured[moduleId]?.actions.push(action);
  });

  return structured;
};
