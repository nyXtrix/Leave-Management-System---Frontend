import React, { useState } from "react";
import { 
  Play, 
  User, 
  Calendar, 
  ShieldCheck, 
  ArrowRight,
  Search,
  Zap
} from "lucide-react";
import type { MasterLeavePolicy } from "../types/policy.types";
import type { ApprovalRule } from "../types/rule.types";
import RuleTraceViewer from "./RuleTraceViewer";
import { ApprovalEngine } from "../engine/ApprovalEngine";
import { Button } from "@/components/ui/Button";

interface PolicyPreviewPanelProps {
  policy: Partial<MasterLeavePolicy>;
  approvalRules: ApprovalRule[];
}

export const PolicyPreviewPanel: React.FC<PolicyPreviewPanelProps> = ({ policy, approvalRules }) => {
  const [previewContext, setPreviewContext] = useState({
    duration: 5,
    leaveType: "SICK",
    role: "software_engineer",
    balance: 10,
    teamAvailability: 80,
    isBackdated: false,
    isBlackout: false,
    noticePeriod: 10
  });

  const approvalChain = ApprovalEngine.generateChain(approvalRules, previewContext);

  return (
    <div className="bg-slate-50 rounded-xl p-5 space-y-6 border border-slate-200">
      <div className="space-y-1">
         <div className="flex items-center gap-1.5 mb-1">
           <Zap className="h-3.5 w-3.5 text-primary-600" />
           <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Live Simulation</span>
         </div>
         <h3 className="text-base font-bold text-slate-900 leading-tight">Policy Preview</h3>
         <p className="text-slate-500 text-xs font-medium">Verify how rules resolve in real-time.</p>
      </div>
      <div className="grid grid-cols-1 gap-3 p-3.5 rounded-lg bg-white border border-slate-200 shadow-sm">
         <div className="space-y-1">
            <label className="text-[9px] font-bold uppercase text-slate-400">Days Requested</label>
            <input 
              type="number" 
              value={previewContext.duration}
              onChange={(e) => setPreviewContext({...previewContext, duration: Number(e.target.value)})}
              className="w-full bg-slate-50 border border-slate-100 rounded-md h-8 px-2 text-xs font-bold focus:ring-1 focus:ring-primary-500 outline-none transition-all"
            />
         </div>
         <div className="space-y-1">
            <label className="text-[9px] font-bold uppercase text-slate-400">Leave Type</label>
            <select 
              value={previewContext.leaveType}
              onChange={(e) => setPreviewContext({...previewContext, leaveType: e.target.value})}
              className="w-full bg-slate-50 border border-slate-100 rounded-md h-8 px-2 text-xs font-bold focus:ring-1 focus:ring-primary-500 outline-none transition-all"
            >
              <option value="SICK">Sick Leave</option>
              <option value="CASUAL">Casual Leave</option>
              <option value="EARNED">Earned Leave</option>
            </select>
         </div>
      </div>

      <div className="space-y-6">
         <div className="space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Approval Chain</span>
            </div>
            
            <div className="space-y-2">
               {approvalChain.map((tier, idx) => (
                 <div key={idx} className="flex items-center gap-2">
                    <div className="flex -space-x-1.5">
                       {tier.map((step, sIdx) => (
                         <div key={sIdx} className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[9px] font-bold text-slate-600 shadow-sm">
                            {step.approverType === "MANAGER" ? "M" : step.approverType === "HR" ? "H" : "A"}
                         </div>
                       ))}
                    </div>
                    <div className="flex-1 h-[1px] bg-slate-200" />
                    {idx < approvalChain.length - 1 && <ArrowRight className="h-3 w-3 text-slate-300" />}
                 </div>
               ))}
               {approvalChain.length === 0 && (
                 <div className="text-[10px] text-slate-400 font-medium italic py-2">No approval logic triggered.</div>
               )}
            </div>
         </div>

         <div className="pt-4 border-t border-slate-200">
            <RuleTraceViewer rules={approvalRules} context={previewContext} />
         </div>
      </div>

      <Button className="w-full h-10 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm">
        Update Scenario <Play className="ml-2 h-3.5 w-3.5 fill-current" />
      </Button>
    </div>
  );
};

export default PolicyPreviewPanel;
