export interface PolicySummary {
  name: string;
  scopeType: number;
  scopeValue: string;
  priority: number;
  isActive: boolean;
}

export interface PolicyRequest {
  name: string;
  scopeType: string | number;
  scopeValue: string;
  priority: number;
  calendar: {
    weekOffs: Array<{ day: string; weeks: number[] }>;
    allowCompOff: boolean;
  };
  usage: {
    sandwichEnabled: boolean;
    includeWeekendsInSandwich: boolean;
    includeHolidaysInSandwich: boolean;
    advanceNoticeDays: number;
    allowBackdated: boolean;
    maxFutureDays: number;
    minServiceDaysRequired: number;
    maxConsecutiveDays: number;
  };
  approvalRules: Array<{
    name: string;
    priority: number;
    approvalMode: string;
    conditions: any;
    steps: Array<{ order: number; approverType: string; roleId: string }>;
  }>;
  balancePolicies: Array<{
    leaveTypeId: string;
    allowCarryForward: boolean;
    maxCarryForward: number;
    allowNegativeBalance: boolean;
    maxNegativeLimit: number;
    roundingRule: string;
  }>;
}