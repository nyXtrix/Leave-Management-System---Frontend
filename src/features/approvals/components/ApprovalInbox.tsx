import React, { useEffect, useState } from "react";
import { 
  CheckCircle2, 
  Clock, 
  User, 
  CalendarDays, 
  Search,
  Filter,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { toast } from "sonner";
import { approvalService, type PendingApproval } from "../../../services/approval.service";
import { cn, formatDate, fromNow } from "@/lib/utils";

const ApprovalInbox = () => {
  const [pending, setPending] = useState<PendingApproval[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchApprovals = async () => {
    setIsLoading(true);
    try {
      const data = await approvalService.getPendingApprovals();
      setPending(data || []);
    } catch (err) {
      toast.error("Failed to load pending approvals");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovals();
  }, []);

  const handleProcess = async (id: string, isApproved: boolean) => {
    try {
      await approvalService.processApproval({
        approvalExternalId: id,
        isApproved,
        remarks: "Processed via Inbox"
      });
      toast.success(isApproved ? "Request Approved" : "Request Rejected");
      fetchApprovals();
    } catch (err: any) {
      toast.error(err.message || "Action failed");
    }
  };

  const filtered = pending.filter(p => 
    p.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.leaveTypeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-reveal">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Approval Inbox</h1>
          <p className="text-sm text-slate-500 font-medium">Manage pending leave requests from your team.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
            <input 
              type="text"
              placeholder="Search employee or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none w-[280px] transition-all shadow-sm"
            />
          </div>
          <Button variant="outline" size="sm" className="h-10 rounded-xl gap-2 font-bold text-xs uppercase tracking-wider">
            <Filter className="h-3.5 w-3.5" />
            Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-32 bg-slate-100/50 animate-pulse rounded-2xl border border-slate-200" />
          ))
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-slate-300 py-20 flex flex-col items-center justify-center text-center space-y-4">
            <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-slate-300" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900">All caught up!</h3>
              <p className="text-sm text-slate-500 max-w-xs">No pending approvals found. Enjoy your productive day.</p>
            </div>
          </div>
        ) : (
          filtered.map((item) => (
            <div 
              key={item.externalId}
              className="group bg-white hover:bg-slate-50/50 p-5 rounded-3xl border border-slate-200 shadow-sm transition-all hover:shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-primary-50 flex items-center justify-center shrink-0 border border-primary-100">
                  <User className="h-6 w-6 text-primary-600" />
                </div>
                <div className="space-y-1 min-w-[200px]">
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    {item.userName}
                    <Badge className="bg-indigo-50 text-indigo-700 text-[10px] uppercase font-bold py-0 h-5">
                      Level {item.sequence}
                    </Badge>
                  </h4>
                  <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {formatDate(item.startDate, 'MMM D')} - {formatDate(item.endDate, 'MMM D, YYYY')}
                    </span>
                    <span className="h-1 w-1 bg-slate-300 rounded-full" />
                    <span className="text-primary-600 font-bold">{item.totalDays} Days</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 max-w-md hidden lg:block px-6 border-x border-slate-100">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-slate-900 text-white text-[10px] hover:bg-slate-800">{item.leaveTypeName}</Badge>
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Applied {fromNow(item.createdAt)}
                  </span>
                </div>
                <p className="text-xs text-slate-600 italic line-clamp-1">"{item.reason}"</p>
              </div>

              <div className="flex items-center gap-2">
                <Button 
                   onClick={() => handleProcess(item.externalId, false)}
                   variant="outline" 
                   size="sm" 
                   className="h-11 px-5 rounded-2xl border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 font-bold transition-all"
                >
                  Reject
                </Button>
                <Button 
                   onClick={() => handleProcess(item.externalId, true)}
                   size="sm" 
                   className="h-11 px-8 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-200 transition-all gap-2"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Approve
                </Button>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-slate-400 hover:text-slate-900">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ApprovalInbox;
