import BaseRequestProvider from "../lib/api/BaseRequestProvider";
import type { 
  EmployeeSearchResult, 
  EmployeeListResponse, 
  RecentInviteResponse, 
  EmployeeDetailResponse,
  BulkUploadStatus,
  EmployeeProfileResponse
} from "@/types/employee.types";
import type { PaginatedResult, QueryParams } from "@/types/utils";

export interface EmployeeFilters extends QueryParams {
  departmentId?: string;
  status?: number;
}

export const employeeService = {
  getEmployees: (filters: EmployeeFilters) => {
    const params: Record<string, string> = {
      page: String(filters.page || 1),
      pageSize: String(filters.pageSize || 12),
      searchTerm: filters.searchTerm || "",
    };

    if (filters.departmentId) params["Filters[departmentId]"] = filters.departmentId;
    if (filters.status !== undefined) params["Filters[status]"] = String(filters.status);

    return BaseRequestProvider.get<PaginatedResult<EmployeeListResponse>>(
      "/organization/employees",
      params
    );
  },

  getRecentInvites: () => BaseRequestProvider.get<RecentInviteResponse[]>(
    "/organization/employees/recent-invites"
  ),

  getReportees: () => BaseRequestProvider.get<EmployeeListResponse[]>(
    "/organization/employees/reportees"
  ),

  lookupEmployees: (search?: string) => BaseRequestProvider.get<EmployeeSearchResult[]>(
    "/organization/employees/lookup",
    search ? { q: search } : undefined
  ),

  getById: (id: string) => BaseRequestProvider.get<EmployeeDetailResponse>(`/organization/employees/${id}`),

  delete: (id: string) => BaseRequestProvider.delete(`/organization/employees/${id}`),

  uploadBulkUsers: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return BaseRequestProvider.post<{ bulkInvitedId: string; message: string }>(
      "/organization/employees/bulk-invite/upload",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        showSuccessToast: true,
        showErrorToast: true,
      }
    );
  },

  getBulkUploadStatus: (id: string) => BaseRequestProvider.get<BulkUploadStatus>(`/organization/employees/bulk-invite/status/${id}`),

  getActiveBulkUpload: () => BaseRequestProvider.get<BulkUploadStatus | null>("/organization/employees/bulk-invite/active"),
  getProfile: (externalId: string) => BaseRequestProvider.get<EmployeeProfileResponse>(`/organization/employees/profile/${externalId}`),
};
