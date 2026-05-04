import React from "react";
import {
  Users,
  CalendarRange,
  ClockCheck,
  Activity,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { DataTable } from "@/components/tables/DataTable";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";

const MOCK_ORG_REQUESTS = [
  {
    id: "1",
    name: "Sarah Lee",
    dept: "Engineering",
    type: "SICK",
    days: 2,
    status: "PENDING",
  },
  {
    id: "2",
    name: "Mark Woods",
    dept: "Product",
    type: "CASUAL",
    days: 1,
    status: "APPROVED",
  },
  {
    id: "3",
    name: "Emily Davis",
    dept: "Design",
    type: "CUSTOM",
    days: 4,
    status: "REJECTED",
  },
];

const DEPT_HEALTH = [
  { name: "Engineering", value: 85, color: "bg-indigo-500" },
  { name: "Product Design", value: 62, color: "bg-emerald-500" },
  { name: "Customer Success", value: 94, color: "bg-amber-500" },
];

const SuperAdminDashboard = () => {
  return (
    <div className="space-y-8 animate-reveal">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Employees"
          value="124"
          subtitle="Across 6 departments"
          icon={Users}
          iconClassName="text-blue-500"
        />
        <StatCard
          title="Active Leaves Today"
          value="12"
          subtitle="9.6% of workforce"
          icon={CalendarRange}
          iconClassName="text-orange-500"
        />
        <StatCard
          title="Pending Approvals"
          value="24"
          subtitle="Requires attention"
          icon={ClockCheck}
          iconClassName="text-rose-500"
        />
        <StatCard
          title="Org Health"
          value="92%"
          subtitle="Availability score"
          icon={Activity}
          iconClassName="text-emerald-500"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <DataTable
              data={MOCK_ORG_REQUESTS}
              columns={
                [
                  { key: "name", header: "Employee" },
                  { key: "dept", header: "Department" },
                  { key: "type", header: "Type" },
                  { key: "days", header: "Duration" },
                  { key: "status", header: "Status" },
                ] as any
              }
              title="Recent Organizational Activity"
              subtitle="Latest leave transitions across the entire workspace"
              pageSize={5}
            />
          </div>
        </div>

        <div className="space-y-6">
          <Card className="rounded-2xl   border-slate-100 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-black">
                    Team Pulse
                  </CardTitle>
                  <CardDescription>Availability by Department</CardDescription>
                </div>
                <ArrowUpRight className="h-5 w-5 text-slate-400" />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {DEPT_HEALTH.map((dept) => (
                <div key={dept.name} className="space-y-3">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-sm font-bold text-slate-700">
                      {dept.name}
                    </span>
                    <span className="text-sm font-black text-slate-900 tabular-nums bg-slate-100 px-2 py-0.5 rounded-lg">
                      {dept.value}%
                    </span>
                  </div>
                  <Progress
                    value={dept.value}
                    className="h-2 rounded-full bg-slate-50"
                    indicatorClassName={dept.color}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="p-6 bg-indigo-600 rounded-2xl text-white flex items-center justify-between group cursor-pointer hover:bg-indigo-700 transition-colors">
            <div>
              <p className="text-xs font-bold text-indigo-200 uppercase tracking-widest">
                Analytics Hub
              </p>
              <h4 className="text-lg font-black mt-1">Deep Dive Reports</h4>
            </div>
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ChevronRight className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
