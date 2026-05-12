import api from "@/lib/api/BaseRequestProvider";
import type {
  Role,
  PaginatedRoles,
  CreateRoleRequest,
  UpdateRoleRequest,
  ToggleRoleStatusRequest,
} from "@/types/organization.types";
import type { QueryParams, LookupOption } from "@/types/utils";

export const roleService = {
  getRoles: (params?: QueryParams) => {
    const queryParams: Record<string, string> = {};
    if (params?.page) queryParams.Page = String(params.page);
    if (params?.pageSize) queryParams.PageSize = String(params.pageSize);
    if (params?.searchTerm) queryParams.SearchTerm = params.searchTerm;

    return api.get<PaginatedRoles>("/organization/roles", queryParams);
  },

  createRole: (data: CreateRoleRequest) =>
    api.post<Role>("/organization/roles", data, {
      showSuccessToast: true,
      successMessage: "Role created successfully.",
      showErrorToast: true,
    }),

  updateRole: (id: string, data: UpdateRoleRequest) =>
    api.put<Role>(`/organization/roles/${id}`, data, {
      showSuccessToast: true,
      successMessage: "Role updated successfully.",
      showErrorToast: true,
    }),

  toggleStatus: (id: string, isActive: boolean) =>
    api.patch<void>(
      `/organization/roles/${id}/status`,
      { isActive } satisfies ToggleRoleStatusRequest,
      {
        showErrorToast: true,
      },
    ),

  deleteRole: (id: string) =>
    api.delete<void>(`/organization/roles/${id}`, {
      showSuccessToast: true,
      successMessage: "Role deleted successfully.",
      showErrorToast: true,
    }),

  getRoleLookup: () => api.get<LookupOption[]>("/organization/roles/lookup"),
};
