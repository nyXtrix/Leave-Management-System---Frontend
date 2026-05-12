export type LeaveStatus = "PENDING" | "APPROVED" | "REJECTED" | "ESCALATED";

export interface LeaveRequest {
  id: string;
  externalId: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar?: string;
  department?: string;
  type: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  duration: number;
  totalDays: number;
  status: LeaveStatus;
  appliedDate: string;
  notes?: string;
  approvedBy?: string;
  approvedDate?: string;
  rejectionReason?: string;
}

export interface LeaveBalance {
  leaveTypeExternalId: string;
  leaveType: string;
  total: number;
  balance: number;
  year: number;
  color?: string;
}

export interface ApplyLeavePayload {
  type: string;
  startDate: string;
  endDate: string;
  notes?: string;
}

export interface LeaveFilters {
  status?: LeaveStatus;
  type?: string;
  employeeId?: string;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface LeaveRecord {
  id: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  duration: string;
  status: "Approved" | "Pending" | "Rejected" | "Cancelled";
}
