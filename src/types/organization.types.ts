import type { PaginatedResult } from "./utils";
import type { AppPermissions } from "./permission.types";

export interface Department {
  id: string;
  name: string;
  headId?: string;
  employeeCount: number;
}

export interface DepartmentResponse {
  id: string;
  departmentName: string;
  description: string;
  totalEmployees: number;
  leaveCount: number;
  leavePercentage: number;
  leavePreview: string[];
}

export type PaginatedDepartments = PaginatedResult<DepartmentResponse>;

export interface CreateDepartmentRequest {
  name: string;
  description?: string;
}

export interface UpdateDepartmentRequest {
  name?: string;
  description?: string;
  isActive?: boolean;
}

export interface RolePermissionDto {
  actions: string[];
  scope: number;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  type: string;
  isActive: boolean;
  members: number;
  permissions: Record<string, RolePermissionDto>;
}

export type PaginatedRoles = PaginatedResult<Role>;

export interface CreateRoleRequest {
  name: string;
  description: string;
  permissions: AppPermissions;
}

export interface UpdateRoleRequest {
  name: string;
  description: string;
  isActive: boolean;
  permissions: AppPermissions;
}

export interface ToggleRoleStatusRequest {
  isActive: boolean;
}
