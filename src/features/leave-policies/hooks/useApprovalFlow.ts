import { useMemo } from "react";
import type { ApprovalRule } from "../types/rule.types";
import { ApprovalEngine } from "../engine/ApprovalEngine";
import type { RuleEvaluationContext } from "../engine/RuleEvaluator";

export const useApprovalFlow = (rules: ApprovalRule[], context: RuleEvaluationContext) => {
  const approvalChain = useMemo(() => {
    return ApprovalEngine.generateChain(rules || [], context);
  }, [rules, context]);

  return {
    approvalChain,
  };
};

export default useApprovalFlow;
