import {
  type AppPermissions,
  type PermissionModuleId,
  type PermissionAction,
  PermissionScope,
} from "@/types/permission.types";

export function canAccess(
  permissions: AppPermissions | undefined | null,
  module: PermissionModuleId | PermissionModuleId[],
  action: PermissionAction | PermissionAction[],
): boolean {
  if (!permissions) return false;

  const modules = Array.isArray(module) ? module : [module];
  const actions = Array.isArray(action) ? action : [action];

  return modules.some((m) => {
    const modulePerms = permissions[m];
    if (!modulePerms || !modulePerms.actions) return false;
    return actions.every((a) => modulePerms.actions.includes(a));
  });
}
export function getScope(
  permissions: AppPermissions | undefined | null,
  module: PermissionModuleId,
): PermissionScope | undefined {
  if (!permissions) return undefined;

  const modulePerms = permissions[module];
  return modulePerms?.scope;
}

export const transformToAppPermissions = (
  flatPermissions: string[],
  scopes: Record<string, PermissionScope | "">,
): AppPermissions => {
  const structured: AppPermissions = {};

  flatPermissions.forEach((perm) => {
    const [moduleId, action] = perm.split(":") as [
      PermissionModuleId,
      PermissionAction,
    ];

    const scopeValue = scopes[moduleId];
    const scope =
      typeof scopeValue === "string" ? (scopeValue as PermissionScope) : PermissionScope.ALL;

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
