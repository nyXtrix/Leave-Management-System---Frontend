import BaseRequestProvider from "../lib/api/BaseRequestProvider";
import type {
  LeaveRequest,
  LeaveBalance,
  ApplyLeavePayload,
} from "../types/leave.types";
import type { PaginatedResult, QueryParams } from "@/types/utils";

export interface LeaveFilters extends QueryParams {
  status?: string;
  type?: string;
  employeeId?: string;
  from?: string;
  to?: string;
}

export const leaveService = {
  getMyLeaves: (filters?: LeaveFilters) => {
    const params: Record<string, string> = {
      page: String(filters?.page || 1),
      pageSize: String(filters?.pageSize || 10),
    };
    if (filters?.status) params["Filters[status]"] = filters.status;
    if (filters?.type) params["Filters[type]"] = filters.type;
    if (filters?.from) params["Filters[from]"] = filters.from;
    if (filters?.to) params["Filters[to]"] = filters.to;
    if (filters?.searchTerm) params["searchTerm"] = filters.searchTerm;

    return BaseRequestProvider.get<PaginatedResult<LeaveRequest>>(
      "/leaves/my-leaves",
      params,
    );
  },

  getAllLeaves: (filters?: LeaveFilters) => {
    const params: Record<string, string> = {
      page: String(filters?.page || 1),
      pageSize: String(filters?.pageSize || 10),
    };
    if (filters?.status) params["Filters[status]"] = filters.status;
    if (filters?.type) params["Filters[type]"] = filters.type;
    if (filters?.employeeId) params["Filters[employeeId]"] = filters.employeeId;
    if (filters?.from) params["Filters[from]"] = filters.from;
    if (filters?.to) params["Filters[to]"] = filters.to;
    if (filters?.searchTerm) params["searchTerm"] = filters.searchTerm;

    return BaseRequestProvider.get<PaginatedResult<LeaveRequest>>(
      "/leaves",
      params,
    );
  },

  getLeaveById: (id: string) =>
    BaseRequestProvider.get<LeaveRequest>(`/leaves/${id}`),

  applyLeave: (payload: ApplyLeavePayload) => {
    const backendPayload = {
      LeaveTypeExternalId: payload.type,
      StartDate: payload.startDate,
      EndDate: payload.endDate,
      Reason: payload.notes,
    };
    return BaseRequestProvider.post<LeaveRequest>(
      "/leaves/apply",
      backendPayload,
    );
  },

  approveLeave: (id: string) =>
    BaseRequestProvider.patch<LeaveRequest>(`/leaves/${id}/approve`),

  rejectLeave: (id: string, reason: string) =>
    BaseRequestProvider.patch<LeaveRequest>(`/leaves/${id}/reject`, {
      reason,
    }),

  cancelLeave: (id: string) => BaseRequestProvider.delete(`/leaves/${id}`),

  getMyBalance: () => BaseRequestProvider.get<LeaveBalance[]>("/leaves/balances"),

  getPendingApprovals: (filters?: QueryParams) => {
    const params: Record<string, string> = {
      page: String(filters?.page || 1),
      pageSize: String(filters?.pageSize || 10),
    };
    return BaseRequestProvider.get<PaginatedResult<LeaveRequest>>(
      "/leaves/pending-approvals",
      params,
    );
  },

  calculateDays: (startDate: string, endDate: string) => {
    return BaseRequestProvider.get<{ days: number }>("/leaves/calculate-days", {
      startDate,
      endDate,
    });
  },
};
