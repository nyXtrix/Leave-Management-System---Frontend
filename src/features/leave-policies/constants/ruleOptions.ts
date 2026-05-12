import type { RuleMetric, RuleOperator, ApproverType, ApprovalMode } from "../types/rule.types";

export const RULE_METRICS: { label: string; value: RuleMetric }[] = [
  { label: "Leave Duration (Days)", value: "DURATION" },
  { label: "Leave Type", value: "LEAVE_TYPE" },
  { label: "Employee Role", value: "ROLE" },
  { label: "Current Balance", value: "BALANCE" },
  { label: "Team Availability (%)", value: "TEAM_AVAILABILITY" },
  { label: "Is Backdated", value: "IS_BACKDATED" },
  { label: "Is Blackout Period", value: "IS_BLACKOUT" },
  { label: "Notice Period (Days)", value: "NOTICE_PERIOD" },
];

export const RULE_OPERATORS: { label: string; value: RuleOperator }[] = [
  { label: "Equals", value: "EQ" },
  { label: "Not Equals", value: "NEQ" },
  { label: "Greater Than", value: "GT" },
  { label: "Less Than", value: "LT" },
  { label: "At Least", value: "GTE" },
  { label: "At Most", value: "LTE" },
  { label: "In List", value: "IN" },
  { label: "Not In List", value: "NOT_IN" },
];

export const APPROVER_TYPES: { label: string; value: ApproverType }[] = [
  { label: "Direct Manager", value: "MANAGER" },
  { label: "Skip-Level Manager (L2)", value: "MANAGER_L2" },
  { label: "Specific Role", value: "SPECIFIC_ROLE" },
  { label: "Specific User", value: "SPECIFIC_USER" },
  { label: "HR Department", value: "HR" },
];

export const APPROVAL_MODES: { label: string; value: ApprovalMode }[] = [
  { label: "Sequential (One by one)", value: "SEQUENTIAL" },
  { label: "Parallel (All must approve)", value: "PARALLEL_ALL" },
  { label: "Parallel (Any one can approve)", value: "PARALLEL_ANY" },
];
