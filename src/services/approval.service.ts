import api from '@/lib/api/BaseRequestProvider';

export interface ApprovalListResponse {
  approvalExternalId: string;
  requestExternalId: string;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  appliedAt: string;
  status: string;
}

export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
}

export interface ProcessApprovalRequest {
  approvalExternalId: string;
  isApproved: boolean;
  remarks?: string;
}

export interface ForwardApprovalRequest {
  approvalExternalId: string;
  newApproverExternalId: string;
  remarks?: string;
}

export interface StatCardDto {
  type: string;
  title: string;
  value: string;
  subtitle: string;
}

export interface ApprovalStatsResponse {
  statCards: StatCardDto[];
}

export const approvalService = {
  getApprovals: async (filters: { page: number; pageSize: number; searchTerm?: string; status?: number }) => {
    const params: Record<string, string> = {
      page: String(filters.page || 1),
      pageSize: String(filters.pageSize || 50),
      searchTerm: filters.searchTerm || "",
    };

    if (filters.status !== undefined) params["Filters[status]"] = String(filters.status);

    return api.get<PaginatedResult<ApprovalListResponse>>('/approvals', params);
  },

  getStats: async () => {
    return api.get<ApprovalStatsResponse>('/approvals/stats');
  },

  processApproval: async (data: ProcessApprovalRequest) => {
    return api.post('/approvals/process', data);
  },

  forwardApproval: async (data: ForwardApprovalRequest) => {
    return api.post('/approvals/forward', data);
  }
};
