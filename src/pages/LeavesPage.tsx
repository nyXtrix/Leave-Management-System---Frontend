import { useState } from "react";
import {
  CalendarRange,
  Plus,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  Filter,
  CalendarDays,
} from "lucide-react";
import { DataTable, type Column } from "@/components/tables/DataTable";
import { Badge } from "@/components/ui/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { ApplyLeaveDialog } from "@/components/common/ApplyLeaveDialog";
import type { LeaveRequest, LeaveBalance } from "@/types/leave.types";
import PageLayout from "@/components/layout/PageLayout";
import LeaveManagement from "@/features/leaves/LeaveManagement";

const MOCK_MY_LEAVES: LeaveRequest[] = [
  {
    id: "1",
    employeeId: "me",
    employeeName: "Alex Johnson",
    type: "CASUAL",
    startDate: "2024-10-05",
    endDate: "2024-10-07",
    duration: 3,
    status: "APPROVED",
    appliedDate: "2024-10-01",
  },
  {
    id: "2",
    employeeId: "me",
    employeeName: "Alex Johnson",
    type: "SICK",
    startDate: "2024-09-12",
    endDate: "2024-09-12",
    duration: 1,
    status: "APPROVED",
    appliedDate: "2024-09-12",
  },
  {
    id: "3",
    employeeId: "me",
    employeeName: "Alex Johnson",
    type: "WFH",
    startDate: "2024-11-20",
    endDate: "2024-11-21",
    duration: 2,
    status: "PENDING",
    appliedDate: "2024-11-15",
  },
  {
    id: "4",
    employeeId: "me",
    employeeName: "Alex Johnson",
    type: "CASUAL",
    startDate: "2024-08-26",
    endDate: "2024-08-28",
    duration: 3,
    status: "REJECTED",
    appliedDate: "2024-08-20",
    rejectionReason: "Critical sprint week",
  },
];

const MOCK_BALANCE: LeaveBalance[] = [
  {
    type: "CASUAL",
    label: "Casual Leave",
    total: 18,
    used: 3,
    pending: 2,
    available: 13,
    color: "bg-indigo-500",
  },
  {
    type: "SICK",
    label: "Sick Leave",
    total: 12,
    used: 1,
    pending: 0,
    available: 11,
    color: "bg-emerald-500",
  },
  {
    type: "WFH",
    label: "Work From Home",
    total: 60,
    used: 12,
    pending: 2,
    available: 46,
    color: "bg-amber-500",
  },
  {
    type: "BEREAVEMENT",
    label: "Bereavement",
    total: 5,
    used: 0,
    pending: 0,
    available: 5,
    color: "bg-rose-500",
  },
];

const TYPE_LABELS: Record<string, string> = {
  SICK: "Sick",
  CASUAL: "Casual",
  CUSTOM: "Custom",
  WFH: "WFH",
  BEREAVEMENT: "Bereavement",
};

const STATUS_CONFIG: Record<
  string,
  {
    variant: "success" | "danger" | "warning" | "primary";
    icon: React.ElementType;
  }
> = {
  APPROVED: { variant: "success", icon: CheckCircle2 },
  REJECTED: { variant: "danger", icon: XCircle },
  PENDING: { variant: "warning", icon: Clock },
  ESCALATED: { variant: "primary", icon: AlertCircle },
};

const COLUMNS: Column<LeaveRequest>[] = [
  {
    key: "type",
    header: "Leave Type",
    sortable: true,
    render: (val) => (
      <span className="text-sm font-semibold text-slate-700">
        {TYPE_LABELS[String(val)]}
      </span>
    ),
  },
  {
    key: "startDate",
    header: "From",
    sortable: true,
    render: (val) => (
      <span className="text-sm text-slate-600">
        {new Date(String(val)).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </span>
    ),
  },
  {
    key: "endDate",
    header: "To",
    sortable: true,
    render: (val) => (
      <span className="text-sm text-slate-600">
        {new Date(String(val)).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </span>
    ),
  },
  {
    key: "duration",
    header: "Days",
    render: (val) => (
      <span className="text-sm font-bold text-slate-800">{String(val)}d</span>
    ),
  },
  {
    key: "appliedDate",
    header: "Applied On",
    sortable: true,
    render: (val) => (
      <span className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
        {new Date(String(val)).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
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
      const c = STATUS_CONFIG[s] ?? {
        variant: "default" as const,
        icon: Clock,
      };
      return (
        <Badge variant={c.variant}>
          <c.icon className="h-3 w-3" />
          {s.charAt(0) + s.slice(1).toLowerCase()}
        </Badge>
      );
    },
  },
];

export function LeavesPage() {
  const [applyOpen, setApplyOpen] = useState(false);

  return (
    // <div className="space-y-12 pb-10">
    //   {/* Header Section */}
    //   <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
    //     <div className="space-y-1">
    //       <h1 className="text-4xl font-black tracking-tight text-slate-900 flex items-center gap-4">
    //         <div className="h-12 w-12 gradient-primary rounded-2xl flex items-center justify-center shadow-glow-primary shrink-0">
    //            <CalendarRange className="h-6 w-6 text-white" />
    //         </div>
    //         Personnel <span className="text-indigo-600">Leaves</span>
    //       </h1>
    //       <p className="text-slate-500 font-medium ml-1">Orchestrate your personal time-off and performance metrics.</p>
    //     </div>
    //     <div className="flex items-center gap-3 shrink-0">
    //       <Button variant="outline" icon={Filter} className="rounded-2xl h-12">Search Preferences</Button>
    //       <Button variant="default" icon={Plus} onClick={() => setApplyOpen(true)} className="rounded-2xl h-12 shadow-glow-primary">Request Time Off</Button>
    //     </div>
    //   </div>

    //   {/* Leave Balance Grid — Premium Variant */}
    //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    //     {MOCK_BALANCE.map((b) => (
    //       <Card key={b.type} className="group overflow-hidden border-slate-200/50 hover:border-indigo-200 hover:shadow-glow-primary transition-all duration-300">
    //         <div className={`absolute top-0 right-0 h-24 w-24 rounded-full blur-[40px] opacity-10 -mr-12 -mt-12 transition-all group-hover:scale-150 ${b.color.replace('bg-', 'bg-')}`} />
    //         <CardHeader className="pb-4 relative z-10 font-bold uppercase tracking-widest text-[10px] text-slate-400 opacity-80">
    //           {b.label}
    //         </CardHeader>
    //         <CardContent className="space-y-5 relative z-10 sm:pt-4">
    //           <div className="flex items-end justify-between">
    //             <div>
    //               <h3 className="text-4xl font-black text-slate-900 leading-none">{b.available}</h3>
    //               <p className="text-xs text-slate-400 font-bold mt-2 uppercase tracking-wide">Days Available</p>
    //             </div>
    //             <div className="text-right">
    //               <p className="text-xs font-black text-slate-800 leading-none">Total {b.total}D</p>
    //               <div className="h-1 w-8 bg-slate-100 rounded-full mt-2 ml-auto overflow-hidden">
    //                 <div className={`h-full ${b.color}`} style={{ width: `${(b.available/b.total)*100}%` }} />
    //               </div>
    //             </div>
    //           </div>
    //           <Progress
    //             value={Math.round((b.available / b.total) * 100)}
    //             className="h-2 rounded-full bg-slate-100/50"
    //             indicatorClassName={`${b.color} shadow-sm`}
    //           />
    //           <div className="flex justify-between items-center px-0.5">
    //             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{b.used} Used</span>
    //             {b.pending > 0 && <Badge variant="warning" className="text-[9px] font-black py-0.5 px-2">{b.pending} Pending</Badge>}
    //           </div>
    //         </CardContent>
    //       </Card>
    //     ))}
    //   </div>

    //   {/* Main Content: Tabs + Table in a Glass Container */}
    //   <div className="glass rounded-[2rem] border-slate-200/60 shadow-premium overflow-hidden">
    //     <Tabs defaultValue="all">
    //       <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-slate-50/50">
    //         <TabsList className="bg-white/50 p-1.5 rounded-2xl border border-slate-200/50 shadow-sm">
    //           <TabsTrigger value="all" className="rounded-xl px-5 py-2 font-bold text-xs uppercase tracking-widest data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-glow-primary transition-all">All History</TabsTrigger>
    //           <TabsTrigger value="pending" className="rounded-xl px-4 py-2 font-bold text-xs uppercase tracking-widest data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-glow-primary transition-all gap-2">
    //             <Clock className="h-3.5 w-3.5" /> Pending
    //           </TabsTrigger>
    //           <TabsTrigger value="approved" className="rounded-xl px-4 py-2 font-bold text-xs uppercase tracking-widest data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-glow-primary transition-all gap-2">
    //             <CheckCircle2 className="h-3.5 w-3.5" /> Approved
    //           </TabsTrigger>
    //           <TabsTrigger value="rejected" className="rounded-xl px-4 py-2 font-bold text-xs uppercase tracking-widest data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-glow-primary transition-all gap-2">
    //             <XCircle className="h-3.5 w-3.5" /> Rejected
    //           </TabsTrigger>
    //         </TabsList>
    //         <div className="hidden sm:flex items-center gap-2 group cursor-help">
    //           <CalendarDays className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
    //           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Global Audit Ready</p>
    //         </div>
    //       </div>

    //       <div className="px-2 pb-2">
    //         <TabsContent value="all">
    //           <DataTable data={MOCK_MY_LEAVES} columns={COLUMNS} searchable searchKeys={['type', 'status']} pageSize={8} />
    //         </TabsContent>
    //         <TabsContent value="pending">
    //           <DataTable data={MOCK_MY_LEAVES.filter(l => l.status === 'PENDING')} columns={COLUMNS} emptyMessage="No pending leave requests" />
    //         </TabsContent>
    //         <TabsContent value="approved">
    //           <DataTable data={MOCK_MY_LEAVES.filter(l => l.status === 'APPROVED')} columns={COLUMNS} emptyMessage="No approved leaves found" />
    //         </TabsContent>
    //         <TabsContent value="rejected">
    //           <DataTable data={MOCK_MY_LEAVES.filter(l => l.status === 'REJECTED')} columns={COLUMNS} emptyMessage="No rejected leaves" />
    //         </TabsContent>
    //       </div>
    //     </Tabs>
    //   </div>

    //   {/* Upcoming schedule reminder */}
    //   <Card className="border-indigo-100 bg-indigo-50/30 rounded-[2rem] overflow-hidden relative">
    //      <div className="absolute top-0 right-0 h-full w-1/3 bg-indigo-600/5 skeleton-pulse pointer-events-none" />
    //     <CardContent className="flex items-center gap-6 py-8 px-10 relative z-10">
    //       <div className="h-14 w-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 shadow-sm">
    //         <CalendarDays className="h-7 w-7" />
    //       </div>
    //       <div>
    //         <p className="text-lg font-black text-slate-900 tracking-tight">Enterprise Leave Rollover Reminder</p>
    //         <p className="text-sm text-slate-500 mt-1 font-medium leading-relaxed">
    //           System Alert: All unused leaves (except 5 sick days) will terminate on <span className="text-indigo-600 font-bold">December 31, 2024</span>.
    //           Please synchronize with your department lead for rollover eligibility.
    //         </p>
    //       </div>
    //       <Button variant="outline" className="ml-auto rounded-xl hidden xl:flex">View Policy Hub</Button>
    //     </CardContent>
    //   </Card>

    //   <ApplyLeaveDialog open={applyOpen} onClose={() => setApplyOpen(false)} />
    // </div>
    <PageLayout title="My leaves">
      <LeaveManagement />
    </PageLayout>
  );
}
