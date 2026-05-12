export type PolicyScope = "ORG" | "LOCATION" | "DEPARTMENT" | "ROLE" | "EMPLOYEE" | "org" | "location" | "department" | "role" | "employee";

export interface PolicyMetadata {
  id?: string;
  tenantId?: string;
  scope: PolicyScope;
  scopeId: string; 
  name: string;
  description?: string;
  priority: number;
  isActive: boolean;
  effectiveFrom?: string;
  effectiveTo?: string;
}

export type WeekDay = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
export type WeekOfMonth = "FIRST" | "SECOND" | "THIRD" | "FOURTH" | "LAST" | "ALL";

export interface CalendarPolicy {
  weekOffs: {
    day: WeekDay;
    weekOfMonth: WeekOfMonth;
    isHalfDay: boolean;
  }[];
  holidays: {
    id?: string;
    date: string;
    name: string;
    isOptional: boolean;
    locationId?: string;
  }[];
  compOffEligibility: {
    enabled: boolean;
    minHoursForHalfDay: number;
    minHoursForFullDay: number;
  };
}

export interface LeaveAllocation {
  type: "FIXED" | "ACCRUAL";
  daysPerYear: number;
  accrualFrequency?: "MONTHLY" | "QUARTERLY";
  accrualRate?: number;
  isProRated: boolean;
  minTenureDays: number;
}

export interface LeaveDefinition {
  leaveTypeId: string;
  isPaid: boolean;
  requiresDocumentation: boolean;
  minDaysForDocumentation: number;
  genderApplicability: "ALL" | "MALE" | "FEMALE" | "OTHER";
  allocation: LeaveAllocation;
  roleIds?: string[]; 
}

export interface UsagePolicy {
  sandwichEnabled: boolean;
  includeWeekendsInSandwich: boolean;
  includeHolidaysInSandwich: boolean;
  clubbingRules: {
    leaveTypeId: string;
    allowedWith: string[]; // List of LeaveType IDs
  }[];
  restrictions: {
    minServiceDays: number;
    minDaysPerRequest: number;
    maxDaysPerRequest: number;
    maxLeavesPerMonth: number;
    maxLeavesPerYear: number;
  };
  timing: {
    advanceNoticeDays: number;
    allowBackdated: boolean;
    backdatedLimitDays?: number;
    maxFutureDays: number;
  };
  blackoutPeriods: {
    startDate: string;
    endDate: string;
    reason: string;
  }[];
}

export interface BalancePolicy {
  leaveTypeId: string;
  allowCarryForward: boolean;
  maxCarryForward: number;
  expiryDays?: number; 
  allowNegativeBalance: boolean;
  maxNegativeLimit: number;
  allowEncashment: boolean;
  maxEncashmentDays?: number;
  roundingRule: "HALF_DAY" | "HOUR" | "NONE";
}

export interface MasterLeavePolicy extends PolicyMetadata {
  calendar?: CalendarPolicy;
  definitions?: LeaveDefinition[];
  usage?: UsagePolicy;
  approvalRules?: any[]; // We will define this in rule.types.ts
  balancePolicies?: BalancePolicy[];
}
