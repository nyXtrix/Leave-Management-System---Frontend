import { useState } from "react";
import { Clock, Inbox, CheckCircle, TrendingUp } from "lucide-react";
import { useQuery } from "@/hooks/useQuery";
import { approvalService } from "@/services/approval.service";
import ApprovalQueue from "./components/ApprovalQueue";
import ProcessApprovalModal from "./components/ProcessApprovalModal";
import ForwardApprovalModal from "./components/ForwardApprovalModal";
import { StatCard, StatCardSkeleton } from "@/components/ui/StatCard";
import { useDebounce } from "@/hooks/useDebounce";

const getApprovalStatUI = (type: string) => {
  switch (type.toUpperCase()) {
    case "PENDING_QUEUE":
      return {
        icon: Clock,
        iconClassName: "text-amber-500",
      };
    case "TODAY_REQUESTS":
      return {
        icon: Inbox,
        iconClassName: "text-primary-500",
      };
    case "RESPONSE_TIME":
      return {
        icon: CheckCircle,
        iconClassName: "text-emerald-500",
      };
    case "APPROVAL_RATE":
      return {
        icon: TrendingUp,
        iconClassName: "text-blue-500",
      };
    default:
      return {
        icon: Clock,
        iconClassName: "text-slate-500",
      };
  }
};


const ApprovalManagement = () => {
  const [activeModal, setActiveModal] = useState<{
    id: string;
    type: "approve" | "reject" | "forward";
  } | null>(null);

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState<number>(1);
  const debouncedSearch = useDebounce(searchTerm, 300);

  const { data, isLoading, refetch } = useQuery(
    approvalService.getApprovals,
    [{ 
      page, 
      pageSize: 5, 
      searchTerm: debouncedSearch, 
      status: status || undefined 
    }],
    { showGlobalLoader: false, ttl: 0 }
  );

  const { data: statsData, refetch: refetchStats, isLoading: isStatsLoading } = useQuery(
    approvalService.getStats,
    [],
    { showGlobalLoader: false, ttl: 0 }
  );

  const approvals = data?.items || [];
  const totalCount = data?.totalCount || 0;

  const handleProcess = async (remarks: string) => {
    if (!activeModal) return;
    await approvalService.processApproval({
      approvalExternalId: activeModal.id,
      isApproved: activeModal.type === "approve",
      remarks,
    });
    await refetch();
    await refetchStats();
    setActiveModal(null);
  };

  const handleForward = async (newApproverId: string, remarks: string) => {
    if (!activeModal) return;
    await approvalService.forwardApproval({
      approvalExternalId: activeModal.id,
      newApproverExternalId: newApproverId,
      remarks,
    });
    await refetch();
    await refetchStats();
    setActiveModal(null);
  };

  const statCards = statsData?.statCards || [];

  return (
    <div className="flex flex-col min-h-[calc(100vh-210px)] gap-6 animate-reveal">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isStatsLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <StatCardSkeleton key={index} />
          ))
        ) : (
          statCards.map((stat, index) => {
            const ui = getApprovalStatUI(stat.type);
            return (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                subtitle={stat.subtitle}
                icon={ui.icon}
                iconClassName={ui.iconClassName}
              />
            );
          })
        )}
      </div>

      <div className="flex-1">
        <ApprovalQueue
          approvals={approvals}
          totalCount={totalCount}
          page={page}
          onPageChange={setPage}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          status={status}
          onStatusChange={setStatus}
          isLoading={isLoading}
          onApprove={(id) => setActiveModal({ id, type: "approve" })}
          onReject={(id) => setActiveModal({ id, type: "reject" })}
          onForward={(id) => setActiveModal({ id, type: "forward" })}
          onRefresh={refetch}
        />
      </div>

      <ProcessApprovalModal
        isOpen={activeModal?.type === "approve" || activeModal?.type === "reject"}
        onClose={() => setActiveModal(null)}
        onConfirm={handleProcess}
        type={activeModal?.type === "forward" ? "approve" : activeModal?.type || "approve"}
      />

      <ForwardApprovalModal
        isOpen={activeModal?.type === "forward"}
        onClose={() => setActiveModal(null)}
        onConfirm={handleForward}
      />
    </div>
  );
};

export default ApprovalManagement;