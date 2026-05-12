import api from '@/lib/api/BaseRequestProvider';
import type { PaginatedResult, QueryParams } from "@/types/utils";
import type { PolicyRequest, PolicySummary } from "@/types/policy.types";

export interface LeaveType {
  externalId: string;
  name: string;
  description?: string;
  maxCancelableStep: number | null;
  defaultAnnualAllowence: number;
}

export interface CreateLeaveTypeRequest {
  name: string;
  description?: string;
  maxCancelableStep: number | null;
  defaultAnnualAllowence: number;
}

export interface Holiday {
  externalId: string;
  name: string;
  date: string;
}

export interface CreateHolidayRequest {
  name: string;
  date: string;
}

export interface WorkflowRule {
  externalId: string;
  leaveTypeName?: string;
  minDays: number;
  maxDays: number;
  steps: WorkflowStep[];
}

export interface WorkflowStep {
  sequence: number;
  approverType: 'MANAGER' | 'ROLE' | 'SPECIFIC_USER';
  approverName?: string;
  roleName?: string;
}

export interface CreateWorkflowRuleRequest {
  leaveTypeExternalId?: string;
  minDays: number;
  maxDays: number;
  steps: CreateWorkflowStepDto[];
}

export interface CreateWorkflowStepDto {
  sequence: number;
  approverType: number; 
  approverExternalId?: string;
  roleExternalId?: string;
}

export const leavePolicyService = {
  getLeaveTypes: async (filters?: QueryParams) => {
    const params: Record<string, string> = {
      page: String(filters?.page || 1),
      pageSize: String(filters?.pageSize || 8),
    };

    if (filters?.searchTerm) {
      params.searchTerm = filters.searchTerm;
    }

    return api.get<PaginatedResult<LeaveType>>('/leave/leaveConfig/types', params);
  },
  createLeaveType: async (data: CreateLeaveTypeRequest) => {
    return api.post<{ id: string }>('/leave/leaveConfig/types', data);
  },
  updateLeaveType: async (id: string, data: CreateLeaveTypeRequest) => {
    return api.put<{ id: string }>(`/leave/leaveConfig/types/${id}`, data);
  },
  deleteLeaveType: async (id: string) => {
    return api.delete(`/leave/leaveConfig/types/${id}`);
  },

  getHolidays: async () => {
    return api.get<Holiday[]>('/leave/leaveConfig/holidays');
  },
  createHoliday: async (data: CreateHolidayRequest) => {
    return api.post<{ id: string }>('/leave/leaveConfig/holidays', data);
  },
  deleteHoliday: async (id: string) => {
    return api.delete(`/leave/leaveConfig/holidays/${id}`);
  },

  getWorkflowRules: async () => {
    return api.get<WorkflowRule[]>('/leave/leaveConfig/rules');
  },
  createWorkflowRule: async (data: CreateWorkflowRuleRequest) => {
    return api.post<{ id: string }>('/leave/leaveConfig/rules', data);
  },
  deleteWorkflowRule: async (id: string) => {
    return api.delete(`/leave/leaveConfig/rules/${id}`);
  },

  getPolicies: async () => {
    return api.get<PolicySummary[]>('/leave/policies');
  },
  getPolicyByScope: async (scopeType: string, scopeValue: string) => {
    return api.get<PolicyRequest>(`/leave/policies/${scopeType}/${scopeValue}`);
  },
  saveUnifiedPolicy: async (data: PolicyRequest) => {
    return api.post<{ id: string }>('/leave/policies', data, {
      showSuccessToast: true,
      successMessage: 'Policy saved successfully.',
      showErrorToast: true
    });
  }
};
