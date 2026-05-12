import { Inbox, CheckCircle2, Clock } from "lucide-react";
import type { ApprovalListResponse } from "@/services/approval.service";
import { differenceInDays } from "date-fns";
import PageHeader from "@/components/common/PageHeader";
import SelectInput from "@/components/common/inputs/SelectInput";

function getQueueHealth(approvals: ApprovalListResponse[]) {
  const oldest = approvals.reduce((max, a) => {
    const d = differenceInDays(new Date(), new Date(a.appliedAt));
    return d > max ? d : max;
  }, 0);
  if (oldest >= 5) return { label: "Needs Attention", className: "text-rose-600 bg-rose-50 ring-1 ring-rose-200" };
  if (oldest >= 2) return { label: "Review Needed", className: "text-amber-600 bg-amber-50 ring-1 ring-amber-200" };
  return { label: "On Track", className: "text-emerald-600 bg-emerald-50 ring-1 ring-emerald-200" };
}

interface ApprovalQueueHeaderProps {
  approvals: ApprovalListResponse[];
  totalCount: number;
  searchTerm: string;
  onSearch: (value: string) => void;
  status: number;
  onStatusChange: (status: number) => void;
  onRefresh: () => void;
  isLoading: boolean;
}

const ApprovalQueueHeader = ({ 
  approvals, 
  totalCount,
  searchTerm, 
  onSearch, 
  status,
  onStatusChange,
  onRefresh, 
  isLoading 
}: ApprovalQueueHeaderProps) => {
  const todayCount = approvals.filter(
    (a) => new Date(a.appliedAt).toDateString() === new Date().toDateString()
  ).length;

  const health = approvals.length > 0 ? getQueueHealth(approvals) : null;

  return (
    <PageHeader
      title="Pending Approvals"
      icon={Inbox}
      sticky={false}
      className="rounded-b-none border-b-0 shadow-none hover:shadow-none hover:border-secondary-200 py-4"
      badge={
        <div className="flex items-center gap-2">
          <span className="h-6 min-w-[24px] px-2 rounded-full bg-primary-100 text-xs font-bold text-primary-700 flex items-center justify-center">
            {totalCount || approvals.length}
          </span>
          {health && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${health.className}`}>
              {health.label}
            </span>
          )}
        </div>
      }
      subtitle={
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
            <Clock className="h-3.5 w-3.5 text-primary-500" />
            {todayCount} new today
          </span>
          <span className="hidden md:flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            {totalCount || approvals.length} awaiting action
          </span>
        </div>
      }
      onSearch={onSearch}
      searchValue={searchTerm}
      searchPlaceholder="Search name or leave type..."
      onRefresh={onRefresh}
      isRefreshing={isLoading}
      filters={
        <div className="w-40">
          <SelectInput
            size="sm"
            value={String(status)}
            onChange={(val) => onStatusChange(Number(val))}
            options={[
              { label: "All Statuses", value: "" },
              { label: "Pending", value: "1" },
              { label: "Approved", value: "2" },
              { label: "Rejected", value: "3" },
            ]}
          />
        </div>
      }
    />
  );
};

export default ApprovalQueueHeader;
