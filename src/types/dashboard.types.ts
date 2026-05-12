export interface StatCardData {
  type: string;
  title: string;
  value: string | number;
  subtitle: string;
}

export interface LeaveBalanceItem {
  leaveType: string;
  consumed: number;
  total: number;
}

export interface RecentActivity {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
}

export interface UserDashboardResponse {
  statCards: StatCardData[];
  leaveBalances: LeaveBalanceItem[];
  recentActivities: RecentActivity[];
}
