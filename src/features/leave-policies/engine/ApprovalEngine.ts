import type { ApprovalRule, ApprovalStep, RuleCondition, RuleGroup } from "../types/rule.types";
import { RuleEvaluator, type RuleEvaluationContext } from "./RuleEvaluator";

export class ApprovalEngine {
  /**
   * Generates a dynamic approval chain based on applicable rules and a specific request context.
   */
  static generateChain(rules: ApprovalRule[], context: RuleEvaluationContext): ApprovalStep[][] {
    // 1. Filter rules that meet conditions
    const applicableRules = rules
      .filter(rule => RuleEvaluator.evaluate(rule.conditions, context))
      .sort((a, b) => b.priority - a.priority);

    if (applicableRules.length === 0) {
      // Fallback: Default Manager approval if no rules match
      return [[{
        id: "default-manager",
        order: 1,
        approverType: "MANAGER"
      }]];
    }

    // 2. Build steps from applicable rules
    // For simplicity in this demo, we take the highest priority rule or merge them.
    // Let's implement a merge strategy where we combine steps and group by order.
    const allSteps: ApprovalStep[] = [];
    const seenSteps = new Set<string>();

    applicableRules.forEach(rule => {
      rule.steps.forEach(step => {
        const stepKey = `${step.approverType}-${step.roleId || ""}-${step.userId || ""}`;
        if (!seenSteps.has(stepKey)) {
          allSteps.push(step);
          seenSteps.add(stepKey);
        }
      });
    });

    // 3. Group by order into tiers (for parallel vs sequential)
    const tiers: Record<number, ApprovalStep[]> = {};
    allSteps.forEach(step => {
      if (!tiers[step.order]) tiers[step.order] = [];
      tiers[step.order].push(step);
    });

    return Object.keys(tiers)
      .sort((a, b) => Number(a) - Number(b))
      .map(order => tiers[Number(order)]);
  }
}
