import type { RuleCondition, RuleGroup, RuleOperator, LogicalOperator } from "../types/rule.types";

export interface RuleEvaluationContext {
  duration: number;
  leaveType: string;
  role: string;
  balance: number;
  teamAvailability: number;
  isBackdated: boolean;
  isBlackout: boolean;
  noticePeriod: number;
  [key: string]: any;
}

export class RuleEvaluator {
  static evaluate(node: RuleCondition | RuleGroup, context: RuleEvaluationContext): boolean {
    if ("operator" in node && "conditions" in node) {
      const group = node as RuleGroup;
      return this.evaluateGroup(group, context);
    } else {
      const condition = node as RuleCondition;
      return this.evaluateCondition(condition, context);
    }
  }

  private static evaluateGroup(group: RuleGroup, context: RuleEvaluationContext): boolean {
    if (group.operator === "AND") {
      return group.conditions.every(c => this.evaluate(c, context));
    } else if (group.operator === "OR") {
      return group.conditions.some(c => this.evaluate(c, context));
    }
    return false;
  }

  private static evaluateCondition(condition: RuleCondition, context: RuleEvaluationContext): boolean {
    const fieldValue = context[condition.metric.toLowerCase() === "duration" ? "duration" : 
                             condition.metric.toLowerCase() === "leave_type" ? "leaveType" : 
                             condition.metric.toLowerCase() === "team_availability" ? "teamAvailability" : 
                             condition.metric.toLowerCase().replace(/_([a-z])/g, (g) => g[1].toUpperCase())];
    
    if (fieldValue === undefined) return false;

    switch (condition.operator) {
      case "EQ": return fieldValue === condition.value;
      case "NEQ": return fieldValue !== condition.value;
      case "GT": return fieldValue > condition.value;
      case "LT": return fieldValue < condition.value;
      case "GTE": return fieldValue >= condition.value;
      case "LTE": return fieldValue <= condition.value;
      case "IN": return Array.isArray(condition.value) && condition.value.includes(fieldValue);
      case "NOT_IN": return Array.isArray(condition.value) && !condition.value.includes(fieldValue);
      default: return false;
    }
  }
}
