import React from "react";
import Modal from "@/components/ui/Modal";
import { useQuery } from "@/hooks/useQuery";
import { employeeService } from "@/services/employee.service";
import {
  BulkInvitedUserStatus,
  BulkRowStatus,
} from "@/types/employee.types";
import {
  History,
  FileText,
  CheckCircle2,
  XCircle, 
  Clock, 
  ChevronRight,
  AlertCircle,
  Search,
  ArrowLeft
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import IconButton from "@/components/ui/IconButton";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface BulkInviteHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StatusBadge = ({ status }: { status: BulkInvitedUserStatus }) => {
  switch (status) {
    case BulkInvitedUserStatus.Completed:
      return <Badge variant="success" className="bg-emerald-100 text-emerald-700 border-emerald-200">Completed</Badge>;
    case BulkInvitedUserStatus.Processing:
      return <Badge variant="warning" className="bg-amber-100 text-amber-700 border-amber-200 animate-pulse">Processing</Badge>;
    case BulkInvitedUserStatus.Queued:
      return <Badge variant="primary" className="bg-slate-100 text-slate-700 border-slate-200">Queued</Badge>;
    case BulkInvitedUserStatus.Failed:
      return <Badge variant="warning" className="bg-rose-100 text-rose-700 border-rose-200">Failed</Badge>;
    case BulkInvitedUserStatus.PartiallyFailed:
      return <Badge variant="warning" className="bg-orange-100 text-orange-700 border-orange-200">Partial Success</Badge>;
    default:
      return null;
  }
};

const RowStatusBadge = ({ status }: { status: BulkRowStatus }) => {
  switch (status) {
    case BulkRowStatus.Skipped:
      return <div className="h-2 w-2 rounded-full bg-amber-500" />;
    case BulkRowStatus.Failed:
      return <div className="h-2 w-2 rounded-full bg-rose-500" />;
    default:
      return null;
  }
};

const BulkInviteHistoryModal = ({ isOpen, onClose }: BulkInviteHistoryModalProps) => {
  const [selectedJobId, setSelectedJobId] = React.useState<string | null>(null);
  const [searchTerm, setSearchTerm] = React.useState("");

  const { data: history, isLoading: isHistoryLoading } = useQuery(
    employeeService.getBulkInviteHistory,
    [],
    { enabled: isOpen && !selectedJobId }
  );

  const { data: details, isLoading: isDetailsLoading } = useQuery(
    employeeService.getBulkInviteDetails,
    [selectedJobId!],
    { enabled: !!selectedJobId }
  );

  const filteredResults = React.useMemo(() => {
    if (!details?.results) return [];
    if (!searchTerm) return details.results;
    return details.results.filter(r => 
      r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.errorMessage?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [details, searchTerm]);

  const handleClose = () => {
    setSelectedJobId(null);
    setSearchTerm("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={selectedJobId ? "Bulk Upload Details" : "Bulk Upload History"}
      description={selectedJobId ? "Detailed results for the selected upload" : "History of all bulk employee invitations"}
      size={selectedJobId ? "xl" : "lg"}
      hideFooter
    >
      <div className="min-h-[400px] max-h-[70dvh] flex flex-col overflow-hidden">
        {selectedJobId ? (
          <div className="flex flex-col flex-1 overflow-hidden space-y-4">
            <div className="flex items-center gap-3">
              <IconButton 
                icon={ArrowLeft} 
                onClick={() => setSelectedJobId(null)}
                variant="ghost"
                size="sm"
              />
              <div className="flex-1">
                <h4 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  {details?.fileName}
                  {details && <StatusBadge status={details.status} />}
                </h4>
                <p className="text-xs text-slate-500">
                  {details?.totalRows} Total rows • {details?.successCount} Success • {details?.failureCount} Failed
                </p>
                {details?.errorMessage && (
                  <div className="mt-2 p-2 bg-rose-50 border border-rose-100 rounded-lg flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-rose-500 mt-0.5 shrink-0" />
                    <p className="text-xs text-rose-700 font-medium">{details.errorMessage}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text"
                placeholder="Search by email or error..."
                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex-1 overflow-y-auto border rounded-xl bg-slate-50/50">
              {isDetailsLoading ? (
                <div className="h-full flex items-center justify-center p-12">
                   <div className="app-loader h-8 w-8"></div>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-white border-b shadow-sm z-10">
                    <tr>
                      <th className="px-4 py-3 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Email Address</th>
                      <th className="px-4 py-3 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Remarks / Error</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResults.map((row, idx) => (
                      <tr key={idx} className="border-b last:border-0 hover:bg-slate-100/50 transition-colors">
                        <td className="px-4 py-3 text-sm font-medium text-slate-700">{row.email}</td>
                        <td className="px-4 py-3">
                           <div className="flex items-center gap-2">
                              <RowStatusBadge status={row.status} />
                              <span className="text-xs font-bold text-slate-600">
                                {row.status === BulkRowStatus.Skipped ? "Exists" : "Failed"}
                              </span>
                           </div>
                        </td>
                        <td className="px-4 py-3">
                           <span className={cn(
                             "text-[11px] font-medium",
                             row.status === BulkRowStatus.Skipped ? "text-amber-600" : "text-rose-500"
                           )}>
                             {row.errorMessage || "Processed successfully"}
                           </span>
                        </td>
                      </tr>
                    ))}
                    {filteredResults.length === 0 && (
                      <tr>
                        <td colSpan={3} className="px-4 py-12 text-center text-slate-400 italic text-sm">
                          No results found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto scrollbar-hide space-y-3">
            {isHistoryLoading ? (
              <div className="flex flex-col space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-20 w-full animate-pulse bg-slate-100 rounded-xl" />
                ))}
              </div>
            ) : history?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                  <History className="h-8 w-8" />
                </div>
                <div>
                   <h4 className="text-base font-bold text-slate-800">No History Found</h4>
                   <p className="text-sm text-slate-500 max-w-[250px]">You haven't uploaded any bulk user invitation files yet.</p>
                </div>
              </div>
            ) : (
              history?.map((job) => (
                <div 
                  key={job.externalId}
                  onClick={() => setSelectedJobId(job.externalId)}
                  className="
                    group flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-white
                    hover:border-primary-200 hover:shadow-md hover:shadow-primary/5 cursor-pointer 
                    transition-all duration-200
                  "
                >
                  <div className="h-12 w-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                    <FileText className="h-6 w-6" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-bold text-slate-800 truncate">{job.fileName}</h4>
                      <StatusBadge status={job.status} />
                    </div>
                    {job.errorMessage && (
                      <p className="text-[10px] text-rose-500 font-black uppercase tracking-tight mb-1 truncate max-w-[300px]">
                        Error: {job.errorMessage}
                      </p>
                    )}
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {format(new Date(job.createdAt), "MMM d, yyyy • hh:mm a")}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      <span>{job.totalRows} Rows</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs font-bold text-emerald-600">{job.successCount} Success</p>
                      <p className="text-xs font-bold text-rose-500">{job.failureCount} Failed</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-primary transition-colors" />
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default BulkInviteHistoryModal;
