import BaseRequestProvider from "../lib/api/BaseRequestProvider";
import type { 
  EmployeeSearchResult, 
  EmployeeListResponse, 
  RecentInviteResponse 
} from "../types/employee.types";

export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
}

export interface EmployeeFilters {
  searchTerm?: string;
  departmentId?: string;
  status?: number;
  page?: number;
  pageSize?: number;
}

export const employeeService = {
  async getEmployees(filters: EmployeeFilters): Promise<PaginatedResult<EmployeeListResponse>> {
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

  async getRecentInvites(): Promise<RecentInviteResponse[]> {
    return BaseRequestProvider.get<RecentInviteResponse[]>(
      "/organization/employees/recent-invites"
    );
  },

  async getReportees(): Promise<EmployeeListResponse[]> {
    return BaseRequestProvider.get<EmployeeListResponse[]>(
      "/organization/employees/reportees"
    );
  },

  async lookupEmployees(search?: string): Promise<EmployeeSearchResult[]> {
    return BaseRequestProvider.get<EmployeeSearchResult[]>(
      "/organization/employees/lookup",
      search ? { q: search } : undefined
    );
  },

  async getById(id: string): Promise<any> {
    return BaseRequestProvider.get<any>(`/organization/employees/${id}`);
  },

  async delete(id: string): Promise<void> {
    return BaseRequestProvider.delete(`/organization/employees/${id}`);
  },
};
