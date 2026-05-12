import { Inbox, Search } from "lucide-react";
import ApprovalCard, { ApprovalCardSkeleton } from "./ApprovalCard";
import EmptyState from "@/components/common/EmptyState";
import type { ApprovalListResponse } from "@/services/approval.service";
import ManagementLayout from "@/components/common/ManagementLayout";
import ApprovalQueueHeader from "./ApprovalQueueHeader";

const PAGE_SIZE = 5;

interface ApprovalQueueProps {
  approvals: ApprovalListResponse[];
  totalCount: number;
  page: number;
  onPageChange: (page: number) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  status: number;
  onStatusChange: (status: number) => void;
  isLoading: boolean;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onForward: (id: string) => void;
  onRefresh: () => void;
}

const ApprovalQueue = ({
  approvals,
  totalCount,
  page,
  onPageChange,
  searchTerm,
  onSearchChange,
  status,
  onStatusChange,
  isLoading,
  onApprove,
  onReject,
  onForward,
  onRefresh,
}: ApprovalQueueProps) => {
  return (
    <ManagementLayout
      containerClassName="h-[calc(100dvh-28rem)] gap-0"
      header={
        <ApprovalQueueHeader
          approvals={approvals}
          totalCount={totalCount}
          searchTerm={searchTerm}
          onSearch={onSearchChange}
          status={status}
          onStatusChange={onStatusChange}
          onRefresh={onRefresh}
          isLoading={isLoading}
        />
      }
      paginationProps={{
        page,
        totalResults: totalCount,
        pageSize: PAGE_SIZE,
        onPageChange: onPageChange,
        className: "w-full border-t-0 bg-white"
      }}
      contentClassName="p-2 sm:p-3 bg-slate-50/50 flex-1 overflow-y-auto"
    >
      {isLoading ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <ApprovalCardSkeleton key={i} />
          ))}
        </div>
      ) : approvals.length === 0 ? (
        <div className="flex items-center justify-center h-full min-h-[280px]">
          <EmptyState
            icon={searchTerm ? Search : Inbox}
            title={searchTerm ? "No Matches Found" : "All Caught Up!"}
            description={
              searchTerm
                ? "Try adjusting your search."
                : "You have no pending approvals right now."
            }
          />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {approvals.map((approval) => (
            <ApprovalCard
              key={approval.approvalExternalId}
              approval={approval}
              onApprove={onApprove}
              onReject={onReject}
              onForward={onForward}
            />
          ))}
        </div>
      )}
    </ManagementLayout>
  );
};

export default ApprovalQueue;
