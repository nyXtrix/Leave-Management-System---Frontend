import api from "@/lib/api/BaseRequestProvider";
import type {
  Role,
  PaginatedRoles,
  CreateRoleRequest,
  UpdateRoleRequest,
  ToggleRoleStatusRequest,
} from "@/types/organization.types";
import type { QueryParams } from "@/types/utils";

export const roleService = {
  getRoles: async (params?: QueryParams): Promise<PaginatedRoles> => {
    const queryParams: Record<string, string> = {};
    if (params?.page) queryParams.Page = String(params.page);
    if (params?.pageSize) queryParams.PageSize = String(params.pageSize);
    if (params?.searchTerm) queryParams.SearchTerm = params.searchTerm;

    return api.get<PaginatedRoles>("/organization/roles", queryParams);
  },

  createRole: async (data: CreateRoleRequest): Promise<Role> => {
    return api.post<Role>("/organization/roles", data, {
      showSuccessToast: true,
      successMessage: "Role created successfully.",
      showErrorToast: true,
    });
  },

  updateRole: async (id: string, data: UpdateRoleRequest): Promise<Role> => {
    return api.put<Role>(`/organization/roles/${id}`, data, {
      showSuccessToast: true,
      successMessage: "Role updated successfully.",
      showErrorToast: true,
    });
  },

  toggleStatus: async (id: string, isActive: boolean): Promise<void> => {
    return api.patch<void>(
      `/organization/roles/${id}/status`,
      { isActive } satisfies ToggleRoleStatusRequest,
      {
        showErrorToast: true,
      },
    );
  },

  deleteRole: async (id: string): Promise<void> => {
    return api.delete<void>(`/organization/roles/${id}`, {
      showSuccessToast: true,
      successMessage: "Role deleted successfully.",
      showErrorToast: true,
    });
  },

  getRoleLookup: async (): Promise<any[]> => {
    return api.get<any[]>("/organization/roles/lookup");
  },
};
