import type { ChartData } from "@/components/charts/BarChart";

export interface DashboardStats {
  totalEmployees: number;
  pendingApprovals: number;
  approvedToday: number;
  onLeaveToday: number;
  availableCasual: number;
  availableSick: number;
  leaveUsedYTD: number;
  orgAvgLeaveUsed: number;
}

export interface EmployeeSearchResult {
  label: string;
  value: string;
  role: string;
}

export interface EmployeeListResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  departmentName: string;
  roleName: string;
  status: number;
  createdAt: string;
}
export type RecentInviteResponse = EmployeeListResponse;

export interface EmployeeDetailResponse extends EmployeeListResponse {
  managerId: string | null;
  departmentId: string;
  gender: number;
}

export interface BulkUploadStatus {
  id: string;
  fileName: string;
  totalRows: number;
  processedRows: number;
  successCount: number;
  failureCount: number;
  status: number;
  errorMessage?: string;
  externalId: string;
  createdAt: string;
}

export interface EmployeeProfileResponse {
  employee: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: number;
    status: number;
    role: string;
    roleId: string;
    roleCode: string;
    department: string | null;
    departmentId: string | null;
    managerName: string | null;
    managerId: string | null;
  };
  leaveBalances: {
    id: string;
    label: string;
    total: number;
    used: number;
    available: number;
    pending: number;
  }[];
  requestStatusCounts: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
    cancelled: number;
  };
  leaveHistory: ChartData[];
}

export const BulkInvitedUserStatus = {
  Queued: 1,
  Processing: 2,
  Completed: 3,
  Failed: 4,
  PartiallyFailed: 5,
} as const;
export type BulkInvitedUserStatus = (typeof BulkInvitedUserStatus)[keyof typeof BulkInvitedUserStatus];

export const BulkRowStatus = {
  Failed: 1,
  Skipped: 2,
} as const;
export type BulkRowStatus = (typeof BulkRowStatus)[keyof typeof BulkRowStatus];

export interface BulkUserInviteDto {
  externalId: string;
  fileName: string;
  totalRows: number;
  successCount: number;
  failureCount: number;
  status: BulkInvitedUserStatus;
  errorMessage?: string;
  createdAt: string;
}

export interface BulkRowResultDto {
  email: string;
  status: BulkRowStatus;
  errorMessage?: string;
}

export interface BulkUserInviteDetailsDto {
  externalId: string;
  fileName: string;
  status: BulkInvitedUserStatus;
  errorMessage?: string;
  totalRows: number;
  successCount: number;
  failureCount: number;
  results: BulkRowResultDto[];
}
