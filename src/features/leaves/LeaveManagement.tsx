import { useState, useMemo, useEffect } from "react";
import LeaveCard from "./LeaveCard";
import LeaveHistory from "./LeaveHistory";
import { useQuery } from "@/hooks/useQuery";
import { leaveService, type LeaveFilters } from "@/services/leave.service";
import { useLoader } from "@/contexts/LoaderContext";
import ApplyLeaveModal from "./ApplyLeaveModal";
import type { LeaveStatus, LeaveBalance, LeaveRequest } from "@/types/leave.types";
import type { PaginatedResult } from "@/types/utils";
import { toast } from "sonner";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const LeaveManagement = () => {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const { showLoader, hideLoader } = useLoader();

  const { data: balances, isLoading: isBalancesLoading, refetch: refetchBalances } = useQuery<LeaveBalance[], []>(
    leaveService.getMyBalance,
    [],
    { showGlobalLoader: false }
  );

  const statusFilter = useMemo(() => {
    if (activeTab === "all") return undefined;
    return activeTab.toUpperCase() as LeaveStatus;
  }, [activeTab]);

  const { data: historyResponse, isLoading: isHistoryLoading, refetch: refetchHistory } = useQuery<PaginatedResult<LeaveRequest>, [LeaveFilters]>(
    leaveService.getMyLeaves,
    [{
      page: currentPage,
      pageSize,
      status: statusFilter,
    }],
    { showGlobalLoader: false }
  );

  useEffect(() => {
    if ((isBalancesLoading && !balances) || (isHistoryLoading && !historyResponse)) {
      showLoader();
    } else {
      hideLoader();
    }
  }, [isBalancesLoading, isHistoryLoading, balances, historyResponse, showLoader, hideLoader]);

  const handleApplyLeave = async (data: { type: string; startDate: string; endDate: string; reason: string }) => {
    await leaveService.applyLeave({
      type: data.type,
      startDate: data.startDate,
      endDate: data.endDate,
      notes: data.reason,
    });
    setIsApplyModalOpen(false);
    refetchBalances();
    refetchHistory();
  };
  
  const handleCancelLeave = async (id: string) => {
    try {
      showLoader();
      await leaveService.cancelLeave(id);
      toast.success("Leave request cancelled successfully", {
        icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />
      });
      refetchBalances();
      refetchHistory();
    } catch (error) {
      toast.error("Failed to cancel leave request", {
        icon: <AlertCircle className="h-4 w-4 text-rose-500" />
      });
      console.error("Failed to cancel leave:", error);
    } finally {
      hideLoader();
    }
  };

  const handleTabChange = (val: string) => {
    setActiveTab(val);
    setCurrentPage(1);
  };

  const safeBalances = balances || [];

  return (
    <div className="flex flex-col gap-6 animate-reveal">
      <div className="space-y-6">
        {safeBalances.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {safeBalances.map((b, idx) => (
              <LeaveCard 
                key={`${b.leaveTypeExternalId}-${idx}`} 
                title={b.leaveType} 
                available={b.balance} 
                total={b.total} 
                color={b.color}
              />
            ))}
          </div>
        ) : !isBalancesLoading && (
           <div className="bg-white border border-dashed border-slate-200 rounded-xl p-8 text-center">
              <p className="text-slate-400 text-sm font-medium">No leave balances allocated yet.</p>
           </div>
        )}

        <LeaveHistory 
          data={historyResponse}
          isLoading={isHistoryLoading}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
          onApplyLeave={() => setIsApplyModalOpen(true)}
          onRefresh={refetchHistory}
          onCancelLeave={handleCancelLeave}
        />
      </div>

      <ApplyLeaveModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        onSubmit={handleApplyLeave}
      />
    </div>
  );
};

export default LeaveManagement;
