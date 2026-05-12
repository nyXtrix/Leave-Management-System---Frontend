import { DataTable } from "@/components/tables/DataTable";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import React, { useMemo } from "react";
import { Plus } from "lucide-react";
import IconButton from "@/components/ui/IconButton";
import { columns } from "./columns";
import type { LeaveRecord } from "@/types/leave.types";
import { format } from "date-fns";
import type { PaginatedResult } from "@/types/utils";
import type { LeaveRequest } from "@/types/leave.types";

interface LeaveHistoryProps {
  data?: PaginatedResult<LeaveRequest> | null;
  isLoading: boolean;
  activeTab: string;
  onTabChange: (val: string) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onApplyLeave: () => void;
  onRefresh?: () => void;
}

const LeaveHistory = ({
  data,
  isLoading,
  activeTab,
  onTabChange,
  currentPage,
  onPageChange,
  pageSize,
  onApplyLeave,
  onRefresh,
}: LeaveHistoryProps) => {
  const mappedData: LeaveRecord[] = useMemo(() => {
    if (!data?.items) return [];
    return data.items.map((leave) => ({
      id: leave.id || leave.externalId,
      leaveType: leave.leaveType || leave.type,
      startDate: leave.startDate ? format(new Date(leave.startDate), "MMM dd, yyyy") : "—",
      endDate: leave.endDate ? format(new Date(leave.endDate), "MMM dd, yyyy") : "—",
      duration: String(leave.totalDays ?? leave.duration ?? 0),
      status: leave.status 
        ? (leave.status.charAt(0) + leave.status.slice(1).toLowerCase()) as any 
        : "Pending",
    }));
  }, [data]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Tabs value={activeTab} onValueChange={onTabChange}>
          <TabsList>
            <TabsTrigger value="all" className="cursor-pointer">
              All History
            </TabsTrigger>
            <TabsTrigger value="approved" className="cursor-pointer">
              Approved
            </TabsTrigger>
            <TabsTrigger value="pending" className="cursor-pointer">
              Pending
            </TabsTrigger>
            <TabsTrigger value="rejected" className="cursor-pointer">
              Rejected
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="cursor-pointer">
              Cancelled
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
          <IconButton
            icon={Plus}
            variant="default"
            onClick={onApplyLeave}
          >
            Apply Leave
          </IconButton>
        </div>
      </div>
      <div className="">
        <DataTable
          columns={columns}
          data={mappedData}
          isLoading={isLoading}
          totalResults={data?.totalCount}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={onPageChange}
          onRefresh={onRefresh}
          title="Request Timeline"
          subtitle="A comprehensive log of your time-off history and status transitions."
        />
      </div>
    </div>
  );
};

export default LeaveHistory;
