import BaseRequestProvider from "../lib/api/BaseRequestProvider";
import type { UserDashboardResponse } from "../types/dashboard.types";

export const dashboardService = {
  getMyDashboard: () => {
    return BaseRequestProvider.get<UserDashboardResponse>("/dashboard/dashboard");
  },
  getAdminDashboard: () => {
    return BaseRequestProvider.get<UserDashboardResponse>("/dashboard/admin");
  },
};
