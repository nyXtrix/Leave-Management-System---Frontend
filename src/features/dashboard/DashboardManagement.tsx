import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  Gift,
  Users,
  CalendarRange,
  ClockCheck,
  Activity,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { StatCard } from "@/components/ui/StatCard";
import { DonutChart } from "@/components/charts/PieChart";
import { ActivityTimeline } from "./components/ActivityTimeline";
import { useQuery } from "@/hooks/useQuery";
import { dashboardService } from "@/services/dashboard.service";

const DASHBOARD_CHART_COLORS = [
  "#475467",
  "#FF1919",
  "#98A2B3",
  "#8C0D0D",
  "#344054",
  "#FF8585",
  "#1D2939",
];

const getUserStatCardUI = (type: string, sub: string) => {
  switch (type.toUpperCase()) {
    case "PRIMARY_BALANCE":
      return {
        icon: CalendarCheck,
        iconClassName: "text-indigo-500",
        route: `${sub}/leaves`,
      };
    case "USED_THIS_YEAR":
      return {
        icon: CheckCircle2,
        iconClassName: "text-emerald-500",
        route: `${sub}/leaves`,
      };
    case "PENDING_REQUESTS":
      return {
        icon: Clock,
        iconClassName: "text-amber-500",
        route: `${sub}/leaves`,
      };
    case "UPCOMING_HOLIDAY":
      return {
        icon: Gift,
        iconClassName: "text-purple-600",
        route: `${sub}/calendar`,
      };
    default:
      return {
        icon: CalendarCheck,
        iconClassName: "text-slate-500",
        route: `${sub}/`,
      };
  }
};

const getAdminStatCardUI = (type: string, sub: string) => {
  switch (type.toUpperCase()) {
    case "TOTAL_EMPLOYEES":
      return {
        icon: Users,
        iconClassName: "text-blue-500",
        route: `${sub}/employees`,
      };
    case "ACTIVE_LEAVES":
      return {
        icon: CalendarRange,
        iconClassName: "text-orange-500",
        route: `${sub}/leaves`,
      };
    case "PENDING_APPROVALS":
      return {
        icon: ClockCheck,
        iconClassName: "text-rose-500",
        route: `${sub}/leaves`,
      };
    case "ORG_HEALTH":
      return {
        icon: Activity,
        iconClassName: "text-emerald-500",
        route: `${sub}/`,
      };
    default:
      return {
        icon: Activity,
        iconClassName: "text-slate-500",
        route: `${sub}/`,
      };
  }
};

const DashboardManagement = () => {
  const navigate = useNavigate();
  const { subdomain } = useParams();
  const { user } = useAuth();

  const sub = subdomain ? `/${subdomain}` : "";

  const hasAdminAccess =
    user?.permissions?.["ADMIN_DASHBOARD"]?.actions.includes("VIEW");
  const isAdmin = user?.roleCode === "SUPER_ADMIN" || hasAdminAccess;

  const getStatCardUI = isAdmin ? getAdminStatCardUI : getUserStatCardUI;
  const fetchFn = isAdmin
    ? dashboardService.getAdminDashboard
    : dashboardService.getMyDashboard;

  const { data: dashboardData, isLoading } = useQuery(fetchFn, [], {
    showGlobalLoader: false,
  });

  const { chartData, chartConfig } = useMemo(() => {
    if (!dashboardData?.leaveBalances)
      return { chartData: [], chartConfig: {} };

    return dashboardData.leaveBalances.reduce(
      (acc, curr, index) => {
        const color =
          DASHBOARD_CHART_COLORS[index % DASHBOARD_CHART_COLORS.length];
        acc.chartData.push({
          name: curr.leaveType,
          value: curr.consumed,
          fill: color,
        });
        acc.chartConfig[curr.leaveType] = { label: curr.leaveType, color };
        return acc;
      },
      { chartData: [] as any[], chartConfig: {} as any },
    );
  }, [dashboardData]);

  if (isLoading || !dashboardData) {
    return (
      <div className="h-[70dvh] flex items-center justify-center">
        <div className="app-loader"></div>
      </div>
    );
  }

  const { statCards, recentActivities } = dashboardData;

  return (
    <div className="space-y-6 animate-reveal">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards?.map((stat, index) => {
          const ui = getStatCardUI(stat.type, sub);
          return (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              subtitle={stat.subtitle}
              icon={ui.icon}
              iconClassName={ui.iconClassName}
              onDetailsClick={() => navigate(ui.route)}
            />
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-1 h-full">
          <DonutChart
            data={chartData}
            config={chartConfig as any}
            title={isAdmin ? "Leave Distribution (Org)" : "Leave Distribution"}
            description={
              isAdmin
                ? "Days consumed across all employees"
                : "Days consumed by type"
            }
          />
        </div>

        <div className="lg:col-span-1 h-full">
          <ActivityTimeline activities={recentActivities || []} />
        </div>
      </div>
    </div>
  );
};

export default DashboardManagement;
