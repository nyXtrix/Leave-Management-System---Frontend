export type RuleMetric = 
  | "DURATION" 
  | "LEAVE_TYPE" 
  | "ROLE" 
  | "BALANCE" 
  | "TEAM_AVAILABILITY" 
  | "IS_BACKDATED" 
  | "IS_BLACKOUT"
  | "NOTICE_PERIOD";

export type RuleOperator = 
  | "EQ" 
  | "NEQ" 
  | "GT" 
  | "LT" 
  | "GTE" 
  | "LTE" 
  | "IN" 
  | "NOT_IN";

export type LogicalOperator = "AND" | "OR";

export interface RuleCondition {
  metric: RuleMetric;
  operator: RuleOperator;
  value: any;
}

export interface RuleGroup {
  operator: LogicalOperator;
  conditions: (RuleCondition | RuleGroup)[];
}

export type ApprovalMode = "SEQUENTIAL" | "PARALLEL_ALL" | "PARALLEL_ANY";

export type ApproverType = 
  | "MANAGER" 
  | "MANAGER_L2" 
  | "SPECIFIC_ROLE" 
  | "SPECIFIC_USER" 
  | "HR";

export interface ApprovalStep {
  id: string;
  order: number;
  approverType: ApproverType;
  roleId?: string;
  userId?: string;
}

export interface EscalationAction {
  type: "ADD_APPROVER" | "ESCALATE_TO_NEXT_LEVEL";
  targetApproverType: ApproverType;
  roleId?: string;
}

export interface EscalationRule {
  escalateAfterHours: number;
  action: EscalationAction;
}

export interface ApprovalRule {
  id: string;
  name: string;
  priority: number;
  conditions: RuleGroup;
  approvalMode: ApprovalMode;
  steps: ApprovalStep[];
  escalationRules?: EscalationRule[];
}
