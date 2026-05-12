import type { LeaveAllocation, BalancePolicy } from "../types/policy.types";

export class LeaveBalanceEngine {

  static calculateAccrual(allocation: LeaveAllocation, monthsActive: number): number {
    if (allocation.type === "FIXED") {
      return allocation.daysPerYear;
    }

    const rate = allocation.accrualRate || (allocation.daysPerYear / 12);
    return Number((rate * monthsActive).toFixed(2));
  }

  static applyCarryForward(balance: number, policy: BalancePolicy): number {
    if (!policy.allowCarryForward) return 0;
    return Math.min(balance, policy.maxCarryForward);
  }

  static canRequest(requestedDays: number, currentBalance: number, policy: BalancePolicy): { allowed: boolean; reason?: string } {
    if (requestedDays <= currentBalance) return { allowed: true };
    
    if (policy.allowNegativeBalance) {
      const remainingDeficit = requestedDays - currentBalance;
      if (remainingDeficit <= policy.maxNegativeLimit) {
        return { allowed: true };
      }
      return { 
        allowed: false, 
        reason: `Request exceeds negative balance limit of ${policy.maxNegativeLimit} days.` 
      };
    }

    return { allowed: false, reason: "Insufficient leave balance." };
  }
}
