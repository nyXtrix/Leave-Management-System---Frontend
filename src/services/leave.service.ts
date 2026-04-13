import BaseRequestProvider from '../lib/api/BaseRequestProvider';
import type {
  LeaveRequest,
  LeaveBalance,
  ApplyLeavePayload,
  LeaveFilters,
  PaginatedResponse,
} from '../types/leave';

export const leaveService = {
  async getMyLeaves(filters?: LeaveFilters): Promise<PaginatedResponse<LeaveRequest>> {
    const params: Record<string, string> = {};
    if (filters?.status) params['status'] = filters.status;
    if (filters?.type) params['type'] = filters.type;
    if (filters?.from) params['from'] = filters.from;
    if (filters?.to) params['to'] = filters.to;
    if (filters?.page) params['page'] = String(filters.page);
    if (filters?.limit) params['limit'] = String(filters.limit);
    return BaseRequestProvider.get<PaginatedResponse<LeaveRequest>>('/leaves/my', params);
  },

  async getAllLeaves(filters?: LeaveFilters): Promise<PaginatedResponse<LeaveRequest>> {
    const params: Record<string, string> = {};
    if (filters?.status) params['status'] = filters.status;
    if (filters?.type) params['type'] = filters.type;
    if (filters?.employeeId) params['employeeId'] = filters.employeeId;
    if (filters?.from) params['from'] = filters.from;
    if (filters?.to) params['to'] = filters.to;
    if (filters?.page) params['page'] = String(filters.page);
    if (filters?.limit) params['limit'] = String(filters.limit);
    return BaseRequestProvider.get<PaginatedResponse<LeaveRequest>>('/leaves', params);
  },

  async getLeaveById(id: string): Promise<LeaveRequest> {
    return BaseRequestProvider.get<LeaveRequest>(`/leaves/${id}`);
  },

  async applyLeave(payload: ApplyLeavePayload): Promise<LeaveRequest> {
    return BaseRequestProvider.post<LeaveRequest>('/leaves', payload);
  },

  async approveLeave(id: string): Promise<LeaveRequest> {
    return BaseRequestProvider.patch<LeaveRequest>(`/leaves/${id}/approve`);
  },

  async rejectLeave(id: string, reason: string): Promise<LeaveRequest> {
    return BaseRequestProvider.patch<LeaveRequest>(`/leaves/${id}/reject`, { reason });
  },

  async cancelLeave(id: string): Promise<void> {
    return BaseRequestProvider.delete(`/leaves/${id}`);
  },

  async getMyBalance(): Promise<LeaveBalance[]> {
    return BaseRequestProvider.get<LeaveBalance[]>('/leaves/balance/my');
  },

  async getPendingApprovals(): Promise<PaginatedResponse<LeaveRequest>> {
    return BaseRequestProvider.get<PaginatedResponse<LeaveRequest>>('/leaves/pending-approvals');
  },
};
