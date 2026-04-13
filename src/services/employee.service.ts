import BaseRequestProvider from '../lib/api/BaseRequestProvider';
import type { Employee } from '../types/employee';
import type { PaginatedResponse } from '../types/leave';

export interface EmployeeFilters {
  search?: string;
  department?: string;
  status?: 'ACTIVE' | 'INACTIVE';
  page?: number;
  limit?: number;
}

export const employeeService = {
  async getAll(filters?: EmployeeFilters): Promise<PaginatedResponse<Employee>> {
    const params: Record<string, string> = {};
    if (filters?.search) params['search'] = filters.search;
    if (filters?.department) params['department'] = filters.department;
    if (filters?.status) params['status'] = filters.status;
    if (filters?.page) params['page'] = String(filters.page);
    if (filters?.limit) params['limit'] = String(filters.limit);
    return BaseRequestProvider.get<PaginatedResponse<Employee>>('/employees', params);
  },

  async getById(id: string): Promise<Employee> {
    return BaseRequestProvider.get<Employee>(`/employees/${id}`);
  },

  async create(payload: Partial<Employee>): Promise<Employee> {
    return BaseRequestProvider.post<Employee>('/employees', payload);
  },

  async update(id: string, payload: Partial<Employee>): Promise<Employee> {
    return BaseRequestProvider.put<Employee>(`/employees/${id}`, payload);
  },

  async delete(id: string): Promise<void> {
    return BaseRequestProvider.delete(`/employees/${id}`);
  },
};
