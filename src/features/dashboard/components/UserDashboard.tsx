import React from "react";
import { 
  CalendarCheck, 
  CheckCircle2, 
  Clock, 
  Gift, 
  Plus, 
  History 
} from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { DataTable } from "@/components/tables/DataTable";
import { Button } from "@/components/ui/Button";
import PageLayout from "@/components/layout/PageLayout";
import type { LeaveRequest } from "@/types/leave.types";

const MOCK_MY_REQUESTS: LeaveRequest[] = [
  {
    id: "1",
    employeeId: "me",
    employeeName: "John Doe",
    type: "SICK",
    startDate: "2024-10-12",
    endDate: "2024-10-13",
    duration: 2,
    status: "PENDING",
    appliedDate: "2024-10-10",
  },
  {
    id: "2",
    employeeId: "me",
    employeeName: "John Doe",
    type: "CASUAL",
    startDate: "2024-09-05",
    endDate: "2024-09-05",
    duration: 1,
    status: "APPROVED",
    appliedDate: "2024-09-01",
  }
];

const COLUMNS = [
  {
    key: "type",
    header: "Leave Type",
    render: (val: any) => <span className="font-medium text-slate-700">{String(val)}</span>
  },
  {
    key: "startDate",
    header: "Duration",
    render: (_val: any, row: any) => (
      <span className="text-sm text-slate-500">
        {row.startDate} - {row.endDate} ({row.duration} {row.duration === 1 ? 'day' : 'days'})
      </span>
    )
  },
  {
    key: "status",
    header: "Status",
    render: (val: any) => (
      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
        val === 'APPROVED' ? 'bg-emerald-50 text-emerald-600' : 
        val === 'PENDING' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
      }`}>
        {String(val)}
      </span>
    )
  }
];

const UserDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Casual Balance"
          value="14.5"
          subtitle="Remaining days"
          icon={CalendarCheck}
          iconClassName="text-indigo-500"
        />
        <StatCard
          title="Used This Year"
          value="22"
          subtitle="Across all types"
          icon={CheckCircle2}
          iconClassName="text-emerald-500"
        />
        <StatCard
          title="Pending Requests"
          value="1"
          subtitle="Awaiting approval"
          icon={Clock}
          iconClassName="text-amber-500"
        />
        <StatCard
          title="Upcoming Holiday"
          value="Diwali"
          subtitle="Nov 1, 2024"
          icon={Gift}
          iconClassName="text-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <DataTable
              data={MOCK_MY_REQUESTS}
              columns={COLUMNS as any}
              title="Recent Activities"
              subtitle="Status of your recent leave applications"
              pageSize={5}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-[1.5rem] text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 h-32 w-32 bg-primary-500/20 rounded-full blur-3xl -mr-16 -mt-16" />
            <h3 className="text-lg font-black tracking-tight relative z-10">Quick Actions</h3>
            <p className="text-slate-400 text-xs mt-1 relative z-10">Plan your next time off</p>
            
            <div className="mt-6 space-y-3 relative z-10">
              <Button className="w-full justify-start h-12 bg-white/10 hover:bg-white/20 border-white/10 text-white rounded-xl gap-3">
                <Plus className="h-4 w-4" /> Apply for Leave
              </Button>
              <Button variant="ghost" className="w-full justify-start h-12 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl gap-3">
                <History className="h-4 w-4" /> View Full History
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
