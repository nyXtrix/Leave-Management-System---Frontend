import api from "@/lib/api/BaseRequestProvider";
import type {
  Department,
  PaginatedDepartments,
  CreateDepartmentRequest,
  UpdateDepartmentRequest,
} from "@/types/organization.types";
import type { QueryParams } from "@/types/utils";

export const departmentService = {
  getDepartments: async (
    params?: QueryParams,
  ): Promise<PaginatedDepartments> => {
    const queryParams: Record<string, string> = {};
    if (params?.page) queryParams.Page = String(params.page);
    if (params?.pageSize) queryParams.PageSize = String(params.pageSize);
    if (params?.searchTerm) queryParams.SearchTerm = params.searchTerm;

    return api.get<PaginatedDepartments>(
      "/organization/departments",
      queryParams,
    );
  },

  createDepartment: async (
    data: CreateDepartmentRequest,
  ): Promise<Department> => {
    return api.post<Department>("/organization/departments", data, {
      showSuccessToast: true,
      successMessage: "Department created successfully.",
      showErrorToast: true,
    });
  },

  updateDepartment: async (
    id: string,
    data: UpdateDepartmentRequest,
  ): Promise<Department> => {
    return api.patch<Department>(`/organization/departments/${id}`, data, {
      showSuccessToast: true,
      successMessage: "Department updated successfully.",
      showErrorToast: true,
    });
  },

  deleteDepartment: async (id: string): Promise<void> => {
    return api.delete<void>(`/organization/departments/${id}`, {
      showSuccessToast: true,
      successMessage: "Department deleted successfully.",
      showErrorToast: true,
    });
  },

  getDepartmentLookups: async (): Promise<any[]> => {
    return api.get<any[]>("/organization/departments/lookup");
  },
};
