import api from "@/lib/api/BaseRequestProvider";
import type {
  Department,
  PaginatedDepartments,
  CreateDepartmentRequest,
  UpdateDepartmentRequest,
} from "@/types/organization.types";
import type { QueryParams, LookupOption } from "@/types/utils";

export const departmentService = {
  getDepartments: (params?: QueryParams) => {
    const queryParams: Record<string, string> = {};
    if (params?.page) queryParams.Page = String(params.page);
    if (params?.pageSize) queryParams.PageSize = String(params.pageSize);
    if (params?.searchTerm) queryParams.SearchTerm = params.searchTerm;

    return api.get<PaginatedDepartments>(
      "/organization/departments",
      queryParams,
    );
  },

  createDepartment: (data: CreateDepartmentRequest) =>
    api.post<Department>("/organization/departments", data, {
      showSuccessToast: true,
      successMessage: "Department created successfully.",
      showErrorToast: true,
    }),

  updateDepartment: (id: string, data: UpdateDepartmentRequest) =>
    api.patch<Department>(`/organization/departments/${id}`, data, {
      showSuccessToast: true,
      successMessage: "Department updated successfully.",
      showErrorToast: true,
    }),

  deleteDepartment: (id: string) =>
    api.delete<void>(`/organization/departments/${id}`, {
      showSuccessToast: true,
      successMessage: "Department deleted successfully.",
      showErrorToast: true,
    }),

  getDepartmentLookups: () =>
    api.get<LookupOption[]>("/organization/departments/lookup"),
};
