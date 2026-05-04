import api from '@/lib/api/BaseRequestProvider';

export interface PendingApproval {
  externalId: string;
  userName: string;
  leaveTypeName: string;
  totalDays: number;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  createdAt: string;
  sequence: number;
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

export const approvalService = {
  getPendingApprovals: async () => {
    return api.get<PendingApproval[]>('/Approvals/pending');
  },

  processApproval: async (data: ProcessApprovalRequest) => {
    return api.post('/Approvals/process', data);
  },

  forwardApproval: async (data: ForwardApprovalRequest) => {
    return api.post('/Approvals/forward', data);
  }
};
