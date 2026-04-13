export type LeaveType = 'SICK' | 'CASUAL' | 'CUSTOM' | 'WFH' | 'BEREAVEMENT';
export type LeaveStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'ESCALATED';

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar?: string;
  department?: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  duration: number; // in days
  status: LeaveStatus;
  appliedDate: string;
  notes?: string;
  approvedBy?: string;
  approvedDate?: string;
  rejectionReason?: string;
}

export interface LeaveBalance {
  type: LeaveType;
  label: string;
  total: number;
  used: number;
  pending: number;
  available: number;
  color: string;
}

export interface ApplyLeavePayload {
  type: LeaveType;
  startDate: string;
  endDate: string;
  notes?: string;
}

export interface LeaveFilters {
  status?: LeaveStatus;
  type?: LeaveType;
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
