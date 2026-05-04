
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
