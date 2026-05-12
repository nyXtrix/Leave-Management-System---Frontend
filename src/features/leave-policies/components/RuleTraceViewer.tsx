import React from "react";
import { CheckCircle2, XCircle, Info, ChevronRight } from "lucide-react";
import type { ApprovalRule } from "../types/rule.types";
import { RuleEvaluator, type RuleEvaluationContext } from "../engine/RuleEvaluator";

interface RuleTraceViewerProps {
  rules: ApprovalRule[];
  context: RuleEvaluationContext;
}

export const RuleTraceViewer: React.FC<RuleTraceViewerProps> = ({ rules, context }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Info className="h-3.5 w-3.5 text-slate-400" />
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Rule Evaluation Trace</span>
      </div>

      <div className="space-y-1.5">
        {rules.map((rule) => {
          const isTriggered = RuleEvaluator.evaluate(rule.conditions, context);
          
          return (
            <div 
              key={rule.id} 
              className={`p-2.5 rounded-lg border flex items-center justify-between transition-all ${
                isTriggered 
                  ? "bg-white border-emerald-200" 
                  : "bg-slate-50 border-slate-200 opacity-60"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`${isTriggered ? "text-emerald-500" : "text-slate-300"}`}>
                  {isTriggered ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
                </div>
                <div>
                   <h5 className={`text-[11px] font-bold ${isTriggered ? "text-slate-900" : "text-slate-500"}`}>
                     {rule.name}
                   </h5>
                   <p className="text-[9px] font-medium text-slate-400">P{rule.priority} • {rule.approvalMode}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                  isTriggered ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-slate-100 text-slate-400 border border-slate-200"
                }`}>
                  {isTriggered ? "MATCH" : "SKIP"}
                </span>
              </div>
            </div>
          );
        })}

        {rules.length === 0 && (
          <div className="text-center py-6 text-slate-400 text-[10px] font-medium italic bg-slate-50 border border-dashed border-slate-200 rounded-lg">
            No rules defined.
          </div>
        )}
      </div>
    </div>
  );
};

export default RuleTraceViewer;
