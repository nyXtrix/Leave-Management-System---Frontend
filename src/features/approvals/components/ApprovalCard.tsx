import { 
  CalendarRange, 
  Clock3, 
  ArrowRightLeft, 
  Check, 
  X, 
  MessageSquare,
  UserRound,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import IconButton from "@/components/ui/IconButton";
import type { ApprovalListResponse } from "@/services/approval.service";
import { format, formatDistanceToNow, differenceInDays } from "date-fns";
import { Skeleton } from "@/components/ui/Skeleton";

interface ApprovalCardProps {
  approval: ApprovalListResponse;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onForward: (id: string) => void;
}


const ApprovalCard = ({ approval, onApprove, onReject, onForward }: ApprovalCardProps) => {
  const startDate = new Date(approval.startDate);
  const endDate = new Date(approval.endDate);
  const pendingSince = formatDistanceToNow(new Date(approval.appliedAt), { addSuffix: true });

  return (
    <div className="group relative flex bg-white border border-secondary-300 rounded-xl hover:border-secondary-200 hover:shadow-sm transition-all duration-200 overflow-hidden">
      <div className="flex-1 px-4 py-3 min-w-0">
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-x-4 gap-y-3">
          <div className="flex items-center gap-2.5 w-36 sm:w-40 shrink-0">
            <div className="h-8 w-8 rounded-full bg-linear-to-br from-primary-500 to-primary-700 flex items-center justify-center shrink-0">
              <UserRound className="h-4 w-4 text-white"/>
            </div>
            <p className="text-sm font-bold text-slate-800 leading-tight truncate" title={approval.employeeName}>
              {approval.employeeName}
            </p>
          </div>

          <div className="md:w-32 w-24 shrink-0">
            <Badge variant="primary" className="text-[10px] p-1.5 w-full flex items-center justify-center truncate  font-medium">{approval.leaveType}</Badge>
          </div>

          <div className="hidden md:block h-7 w-px bg-slate-100 shrink-0" />
          
          <div className="flex items-center gap-1.5 text-slate-500 w-40 sm:w-44 shrink-0">
            <CalendarRange className="h-3.5 w-3.5 text-primary-600 shrink-0" />
            <span className="text-xs font-semibold whitespace-nowrap truncate">
              {format(startDate, "MMM d")} – {format(endDate, "MMM d, yyyy")}
            </span>
            <Badge variant="default" className="text-[10px] px-1.5 py-0 font-medium shrink-0">
              {approval.totalDays}d
            </Badge>
          </div>

          <div className="hidden md:block h-7 w-px bg-slate-100 shrink-0" />
          
          <div className="flex items-start gap-1.5 flex-1 min-w-32">
            <MessageSquare className="h-3.5 w-3.5 shrink-0 mt-0.5 text-primary-600" />
            <p className="text-xs text-slate-500 font-medium truncate" title={approval.reason?.trim() || "No reason provided"}>
              {approval.reason?.trim() || "No reason provided"}
            </p>
          </div>

          <div className="hidden xl:flex items-center gap-3 shrink-0 ml-auto pl-4 border-l border-slate-50">
            <div className="flex items-center gap-1.5 text-secondary-500 w-24 justify-end mr-1">
              <Clock3 className="h-3.5 w-3.5 shrink-0 text-primary-600" />
              <span className="text-xs font-medium whitespace-nowrap">{pendingSince}</span>
            </div>
            {/* <IconButton
              icon={ArrowRightLeft}
              onClick={() => onForward(approval.approvalExternalId)}
              tooltip="Forward"
              variant="ghost"
              size="xs"
              className="h-7 w-7 p-0 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-100 transition-all shadow-none"
              iconClassName="h-3.5 w-3.5"
            /> */}
            {approval.status === 1 && (
              <>
                <IconButton
                  icon={X}
                  onClick={() => onReject(approval.approvalExternalId)}
                  variant="ghost"
                  size="xs"
                  className="h-7 px-2.5 rounded-md flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-100 transition-all shadow-none"
                  iconClassName="h-3 w-3"
                >
                  Reject
                </IconButton>
                <IconButton
                  onClick={() => onApprove(approval.approvalExternalId)}
                  variant="ghost"
                  size="xs"    
                  icon={Check}
                  className="h-7 px-2.5 rounded-md flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all shadow-none"
                  iconClassName="h-3 w-3"
                >
                  Approve
                </IconButton>
              </>
            )}
          </div>
        </div>

        <div className="flex xl:hidden items-center gap-2 mt-2.5 pt-2.5 border-t border-slate-50">
          <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium mr-auto">
            <Clock3 className="h-3 w-3" />
            {pendingSince}
          </span>
          {/* <IconButton
            icon={ArrowRightLeft}
            onClick={() => onForward(approval.approvalExternalId)}
            tooltip="Forward"
            variant="ghost"
            size="xs"
            className="h-7 w-7 p-0 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all shadow-none"
            iconClassName="h-3.5 w-3.5"
          /> */}
          {approval.status === 1 && (
            <>
              <IconButton
                icon={X}
                onClick={() => onReject(approval.approvalExternalId)}
                variant="ghost"
                size="xs"
                className="h-7 px-2.5 rounded-md flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-100 transition-all shadow-none"
                iconClassName="h-3 w-3"
              >
                Reject
              </IconButton>
              <IconButton
                icon={Check}
                onClick={() => onApprove(approval.approvalExternalId)}
                variant="ghost"
                size="xs"
                className="h-7 px-2.5 rounded-md flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all shadow-none"
                iconClassName="h-3 w-3"
              >
                Approve
              </IconButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const ApprovalCardSkeleton = () => (
  <div className="flex bg-white border border-secondary-100 rounded-xl overflow-hidden p-4">
    <div className="flex flex-1 items-center gap-4">
      <Skeleton className="h-10 w-10 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-3 w-1/6" />
      </div>
      <Skeleton className="h-6 w-24 rounded-lg hidden md:block" />
      <Skeleton className="h-4 w-32 hidden lg:block" />
      <div className="flex gap-2 ml-auto">
        <Skeleton className="h-8 w-8 rounded-lg" />
        <Skeleton className="h-8 w-20 rounded-lg" />
        <Skeleton className="h-8 w-20 rounded-lg" />
      </div>
    </div>
  </div>
);

export default ApprovalCard;
