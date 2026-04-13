import {
  Sun,
  Thermometer,
  Hourglass,
  CalendarCheck,
  AlertCircle,
  TrendingUp,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  Network,
  Gift,
  ClockCheck,
} from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { DataTable } from "@/components/tables/DataTable";
import { Badge } from "@/components/ui/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { Button } from "@/components/ui/Button";
import type { LeaveRequest } from "@/types/leave";
import { useAuth } from "@/contexts/AuthContext";
import type { Column } from "@/components/tables/DataTable";
import PageLayout from "@/components/layout/PageLayout";
// import PieChart from "@/components/charts/PieChart";

const MOCK_REQUESTS: LeaveRequest[] = [
  {
    id: "1",
    employeeId: "e1",
    employeeName: "Sarah Lee",
    employeeAvatar:
      "https://ui-avatars.com/api/?name=Sarah+Lee&background=f472b6&color=fff",
    department: "Engineering",
    type: "SICK",
    startDate: "2024-10-12",
    endDate: "2024-10-13",
    duration: 2,
    status: "PENDING",
    appliedDate: "2024-10-10",
  },
  {
    id: "2",
    employeeId: "e2",
    employeeName: "Mark Woods",
    employeeAvatar:
      "https://ui-avatars.com/api/?name=Mark+Woods&background=38bdf8&color=fff",
    department: "Product",
    type: "CASUAL",
    startDate: "2024-10-10",
    endDate: "2024-10-10",
    duration: 1,
    status: "APPROVED",
    appliedDate: "2024-10-08",
  },
  {
    id: "3",
    employeeId: "e3",
    employeeName: "Emily Davis",
    employeeAvatar:
      "https://ui-avatars.com/api/?name=Emily+Davis&background=fbbf24&color=fff",
    department: "Design",
    type: "CUSTOM",
    startDate: "2024-10-08",
    endDate: "2024-10-11",
    duration: 4,
    status: "REJECTED",
    appliedDate: "2024-10-05",
  },
  {
    id: "4",
    employeeId: "e4",
    employeeName: "James Chen",
    employeeAvatar:
      "https://ui-avatars.com/api/?name=James+Chen&background=4ade80&color=fff",
    department: "Engineering",
    type: "WFH",
    startDate: "2024-10-15",
    endDate: "2024-10-15",
    duration: 1,
    status: "APPROVED",
    appliedDate: "2024-10-12",
  },
  {
    id: "5",
    employeeId: "e5",
    employeeName: "Priya Sharma",
    employeeAvatar:
      "https://ui-avatars.com/api/?name=Priya+Sharma&background=a78bfa&color=fff",
    department: "Customer Success",
    type: "BEREAVEMENT",
    startDate: "2024-10-14",
    endDate: "2024-10-17",
    duration: 4,
    status: "ESCALATED",
    appliedDate: "2024-10-13",
  },
];

const DEPT_HEALTH = [
  { name: "Engineering", value: 85, color: "bg-indigo-500" },
  { name: "Product Design", value: 62, color: "bg-emerald-500" },
  { name: "Customer Success", value: 94, color: "bg-amber-500" },
  { name: "Marketing", value: 78, color: "bg-rose-400" },
];

const LEAVE_TYPE_LABELS: Record<string, string> = {
  SICK: "Sick",
  CASUAL: "Casual",
  CUSTOM: "Custom",
  WFH: "WFH",
  BEREAVEMENT: "Bereavement",
};

const COLUMNS: Column<LeaveRequest>[] = [
  {
    key: "employeeName",
    header: "Employee",
    sortable: true,
    render: (_val, row) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9">
          <AvatarImage src={row.employeeAvatar} alt={row.employeeName} />
          <AvatarFallback>
            {row.employeeName.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-semibold text-slate-800">
            {row.employeeName}
          </p>
          <p className="text-xs text-slate-400">{row.department}</p>
        </div>
      </div>
    ),
  },
  {
    key: "type",
    header: "Leave Type",
    sortable: true,
    render: (val) => (
      <span className="text-sm font-medium text-slate-600">
        {LEAVE_TYPE_LABELS[String(val)] ?? String(val)}
      </span>
    ),
  },
  {
    key: "duration",
    header: "Duration",
    render: (val) => (
      <div className="flex items-center gap-2">
        <div className="h-1.5 w-1.5 bg-indigo-400 rounded-full" />
        <span className="text-sm font-bold text-slate-800">
          {String(val)} {Number(val) === 1 ? "day" : "days"}
        </span>
      </div>
    ),
  },
  {
    key: "appliedDate",
    header: "Applied",
    sortable: true,
    render: (val) => (
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
        {new Date(String(val)).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (val) => {
      const s = String(val);
      const cfg: Record<
        string,
        {
          variant: "success" | "danger" | "warning" | "primary" | "default";
          icon: React.ElementType;
        }
      > = {
        APPROVED: { variant: "success", icon: CheckCircle2 },
        REJECTED: { variant: "danger", icon: XCircle },
        PENDING: { variant: "warning", icon: Clock },
        ESCALATED: { variant: "primary", icon: AlertCircle },
      };
      const c = cfg[s] ?? { variant: "default", icon: Clock };
      return (
        <Badge variant={c.variant} className="gap-1.5">
          <c.icon className="h-3 w-3" />
          {s.charAt(0) + s.slice(1).toLowerCase()}
        </Badge>
      );
    },
  },
];

export function DashboardPage() {
  const { user } = useAuth();

  return (
    // <div className="space-y-10 pb-10">
    //   {/* Page Header */}
    //   <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
    //     <div className="space-y-1">
    //       <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
    //         Welcome back, <span className="text-indigo-600">{user?.name?.split(' ')[0]}</span> 👋
    //       </h1>
    //       <p className="text-slate-500 font-medium flex items-center gap-2">
    //         <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
    //         {user?.tenantName} · {user?.role?.replace(/_/g, ' ')} · {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
    //       </p>
    //     </div>
    //     <div className="flex items-center gap-3 shrink-0">
    //       <Button variant="outline" icon={FileText} className="rounded-2xl h-12">Export Report</Button>
    //       <Button variant="default" icon={TrendingUp} className="rounded-2xl h-12 shadow-glow-primary">Analytics</Button>
    //     </div>
    //   </div>

    //   {/* Stat Cards */}
    //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    //     <StatCard title="Casual Balance" value="14.5" subtitle="Days until Dec 31" icon={Sun} change={12} gradient="primary" className="hover:-translate-y-1 transition-transform" />
    //     <StatCard title="Sick Balance" value="8" subtitle="Annual: 12 days" icon={Thermometer} gradient="success" className="hover:-translate-y-1 transition-transform" />
    //     <StatCard title="Pending Approvals" value="3" subtitle="Awaiting response" icon={Hourglass} change={-15} gradient="warning" className="hover:-translate-y-1 transition-transform" />
    //     <StatCard title="Days Used YTD" value="22" subtitle="Org avg: 18.2 days" icon={CalendarCheck} change={-5} gradient="rose" className="hover:-translate-y-1 transition-transform" />
    //   </div>

    //   {/* Main Two-Column Layout */}
    //   <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
    //     {/* Leave Requests Table */}
    //     <div className="xl:col-span-2 space-y-6">
    //       <div className="glass rounded-[2rem] border-slate-200/60 shadow-premium overflow-hidden">
    //         <DataTable
    //           data={MOCK_REQUESTS}
    //           columns={COLUMNS}
    //           title="Recent Leave Requests"
    //           subtitle="Updates across departments"
    //           searchable
    //           searchKeys={['employeeName', 'department', 'type', 'status']}
    //           pageSize={5}
    //         />
    //       </div>
    //     </div>

    //     {/* Right Column: Policy + Dept Health */}
    //     <div className="space-y-8">
    //       {/* Policy card */}
    //       <Card className="bg-slate-950 text-white border-none shadow-2xl relative overflow-hidden group">
    //         <div className="absolute top-0 right-0 h-48 w-48 bg-indigo-600 rounded-full blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity" />
    //         <div className="absolute bottom-0 left-0 h-48 w-48 bg-violet-600 rounded-full blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity" />

    //         <CardHeader className="relative z-10">
    //           <CardTitle className="text-white text-2xl">Policy Centre</CardTitle>
    //           <CardDescription className="text-indigo-300 font-bold tracking-[0.2em] opacity-70">ADMIN UPDATES · Q4 2024</CardDescription>
    //         </CardHeader>
    //         <CardContent className="relative z-10 space-y-4 pb-8">
    //           <div className="group/item flex gap-4 items-start p-4 bg-white/5 rounded-[1.25rem] border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
    //             <div className="h-10 w-10 shrink-0 bg-indigo-500/20 rounded-xl flex items-center justify-center border border-indigo-500/30">
    //               <AlertCircle className="h-5 w-5 text-indigo-300" />
    //             </div>
    //             <div>
    //               <h4 className="text-sm font-bold text-white group-hover/item:text-indigo-200 transition-colors">Leave Rollover Notice</h4>
    //               <p className="text-xs text-indigo-300/70 mt-1 leading-relaxed">
    //                 Unused sick leaves carry forward up to 5 days max starting 2026.
    //               </p>
    //             </div>
    //           </div>
    //           <div className="group/item flex gap-4 items-start p-4 bg-white/5 rounded-[1.25rem] border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
    //             <div className="h-10 w-10 shrink-0 bg-amber-500/20 rounded-xl flex items-center justify-center border border-amber-500/30">
    //               <FileText className="h-5 w-5 text-amber-300" />
    //             </div>
    //             <div>
    //               <h4 className="text-sm font-bold text-white group-hover/item:text-amber-200 transition-colors">WFH Policy Updated</h4>
    //               <p className="text-xs text-indigo-300/70 mt-1 leading-relaxed">
    //                 Max 3 WFH days per week. Effective from Nov 1, 2024.
    //               </p>
    //             </div>
    //           </div>
    //           <Button variant="outline" className="w-full mt-2 bg-white/5 border-white/20 text-white hover:bg-white/10 rounded-2xl text-xs font-bold uppercase tracking-widest h-12 shadow-glow-primary">
    //             Explore Policy Engine
    //           </Button>
    //         </CardContent>
    //       </Card>

    //       {/* Department Health */}
    //       <Card className="rounded-[2rem] border-slate-200/50 shadow-premium">
    //         <CardHeader className="pb-4">
    //           <div className="flex items-center justify-between">
    //             <div>
    //               <CardTitle className="text-xl">Team Pulse</CardTitle>
    //               <CardDescription>Current availability</CardDescription>
    //             </div>
    //             <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center">
    //               <Network className="h-5 w-5 text-slate-400" />
    //             </div>
    //           </div>
    //         </CardHeader>
    //         <CardContent className="space-y-6">
    //           {DEPT_HEALTH.map((dept) => (
    //             <div key={dept.name} className="space-y-3">
    //               <div className="flex justify-between items-center px-1">
    //                 <span className="text-sm font-bold text-slate-700">{dept.name}</span>
    //                 <span className="text-sm font-black text-slate-900 tabular-nums bg-slate-100 px-2 py-0.5 rounded-lg">{dept.value}%</span>
    //               </div>
    //               <Progress
    //                 value={dept.value}
    //                 className="h-2.5 rounded-full bg-slate-100"
    //                 indicatorClassName={`${dept.color} shadow-[0_0_12px_-2px_rgba(0,0,0,0.1)]`}
    //               />
    //             </div>
    //           ))}
    //         </CardContent>
    //       </Card>
    //     </div>
    //   </div>
    // </div>

    <PageLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Leave Balance"
          value="14.5"
          subtitle="Days until Dec 31"
          icon={CalendarCheck}
          className="hover:-translate-y-1 transition-transform"
          iconClassName="text-primary-500"
        />
        <StatCard
          title="Used YDT"
          value="22"
          subtitle="Days until Dec 31"
          icon={CheckCircle2}
          className="hover:-translate-y-1 transition-transform"
          iconClassName="text-green-500"
        />
        <StatCard
          title="Pending Requests"
          value="2"
          subtitle="Days until Dec 31"
          icon={Clock}
          className="hover:-translate-y-1 transition-transform"
          iconClassName="text-yellow-500"
        />
        <StatCard
          title="Upcoming Holiday"
          value="Diwali"
          subtitle="Nov 1, 2024"
          icon={Gift}
          className="hover:-translate-y-1 transition-transform"
          iconClassName="text-purple-600"
        />
      </div>
{/* 
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-8">
        <div className="xl:col-span-1">
          <PieChart />
        </div>

        <div className="xl:col-span-2">
          <div className="glass rounded-[2rem] border-slate-200/60 shadow-premium overflow-hidden bg-white">
            <DataTable
              data={MOCK_REQUESTS}
              columns={COLUMNS}
              title="Recent Activities"
              subtitle="Latest update on your requests"
              pageSize={5}
            />
          </div>
        </div>
      </div> */}
    </PageLayout>
  );
}
