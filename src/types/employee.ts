export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  role: string;
  avatar?: string;
  joinDate: string;
  status: 'ACTIVE' | 'INACTIVE';
  managerId?: string;
  tenantId: string;
}

export interface Department {
  id: string;
  name: string;
  headId?: string;
  employeeCount: number;
}

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
