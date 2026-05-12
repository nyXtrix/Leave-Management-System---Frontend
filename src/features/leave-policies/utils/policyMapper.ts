import type { MasterLeavePolicy, PolicyScope } from "../types/policy.types";
import type { PolicyRequest } from "@/types/policy.types";
import type { MasterPolicyType } from "@/validations/leaves/policy/MasterPolicySchema";

type RequiredCalendar = NonNullable<MasterPolicyType["calendar"]>;
type RequiredUsage = NonNullable<MasterPolicyType["usage"]>;
type RequiredApprovalRule = MasterPolicyType["approvalRules"][0];
type RequiredBalancePolicy = MasterPolicyType["balancePolicies"][0];

type FrontendWeekOff = RequiredCalendar["weekOffs"][0];
type BackendWeekOff = { day: string; weeks: number[] };

const WEEK_NUMBER_TO_LABEL: Record<number, FrontendWeekOff["weekOfMonth"]> = {
  1: "FIRST",
  2: "SECOND",
  3: "THIRD",
  4: "FOURTH",
  5: "LAST",
};

const WEEK_LABEL_TO_NUMBER: Record<FrontendWeekOff["weekOfMonth"], number[]> = {
  ALL: [],
  FIRST: [1],
  SECOND: [2],
  THIRD: [3],
  FOURTH: [4],
  LAST: [5],
};

const toFrontendWeekOff = (raw: BackendWeekOff): FrontendWeekOff => {
  let weekOfMonth: FrontendWeekOff["weekOfMonth"] = "ALL";
  if (raw.weeks && raw.weeks.length > 0 && raw.weeks[0] !== 0) {
    weekOfMonth = WEEK_NUMBER_TO_LABEL[raw.weeks[0]] ?? "ALL";
  }
  return {
    day: raw.day.toUpperCase() as FrontendWeekOff["day"],
    weekOfMonth,
    isHalfDay: false,
  };
};

const toBackendWeekOff = (f: FrontendWeekOff): BackendWeekOff => ({
  day: f.day,
  weeks: WEEK_LABEL_TO_NUMBER[f.weekOfMonth] ?? [],
});



export const mapBackendToFrontend = (data: PolicyRequest): MasterPolicyType => {
  return {
    name: data.name,
    scope: (data.scopeType as string).toLowerCase() as PolicyScope,
    scopeId: data.scopeValue,
    priority: data.priority,
    isActive: true,
    calendar: {
      weekOffs: (data.calendar.weekOffs || []).map(toFrontendWeekOff),
      compOffEligibility: {
        enabled: data.calendar.allowCompOff,
        minHoursForHalfDay: 4,
        minHoursForFullDay: 8,
      },
      holidays: [],
    },
    usage: {
      sandwichEnabled: data.usage.sandwichEnabled,
      includeWeekendsInSandwich: data.usage.includeWeekendsInSandwich,
      includeHolidaysInSandwich: data.usage.includeHolidaysInSandwich,
      clubbingRules: [],
      timing: {
        advanceNoticeDays: data.usage.advanceNoticeDays,
        allowBackdated: data.usage.allowBackdated,
        maxFutureDays: data.usage.maxFutureDays,
      },
      restrictions: {
        minServiceDays: data.usage.minServiceDaysRequired,
        minDaysPerRequest: 1,
        maxDaysPerRequest: data.usage.maxConsecutiveDays,
        maxLeavesPerMonth: 10,
        maxLeavesPerYear: 30,
      },
      blackoutPeriods: [],
    },
    definitions: [],
    approvalRules: (data.approvalRules || []).map((rule) => ({
      id: crypto.randomUUID(),
      name: rule.name,
      priority: rule.priority,
      approvalMode: (
        rule.approvalMode as string
      ).toUpperCase() as RequiredApprovalRule["approvalMode"],
      conditions: rule.conditions,
      levels: rule.steps
        .filter((step) => step.approverType.toUpperCase() === "ROLE")
        .map((step) => {
          return {
            id: crypto.randomUUID(),
            rank: step.order,
            approverType: step.roleId,
            roleId: step.roleId,
          };
        }),
      minDays: 0,
      maxDays: 365,
    })),
    balancePolicies: (data.balancePolicies || []).map((bp) => ({
      leaveTypeId: bp.leaveTypeId,
      allowCarryForward: bp.allowCarryForward,
      maxCarryForward: bp.maxCarryForward,
      allowNegativeBalance: bp.allowNegativeBalance,
      maxNegativeLimit: bp.maxNegativeLimit,
      allowEncashment: false,
      roundingRule: (
        bp.roundingRule as string
      ).toUpperCase() as RequiredBalancePolicy["roundingRule"],
    })),
  };
};

export const mapFrontendToBackend = (data: MasterPolicyType): PolicyRequest => {
  return {
    name: data.name || `${data.scope} Policy`,
    scopeType: data.scope,
    scopeValue: data.scopeId,
    priority: data.priority || 1,
    calendar: {
      weekOffs: (data.calendar?.weekOffs || []).map(toBackendWeekOff),
      allowCompOff: data.calendar?.compOffEligibility?.enabled || false,
    },
    usage: {
      sandwichEnabled: data.usage?.sandwichEnabled || false,
      includeWeekendsInSandwich: data.usage?.includeWeekendsInSandwich || false,
      includeHolidaysInSandwich: data.usage?.includeHolidaysInSandwich || false,
      advanceNoticeDays: data.usage?.timing?.advanceNoticeDays || 0,
      allowBackdated: data.usage?.timing?.allowBackdated || false,
      maxFutureDays: data.usage?.timing?.maxFutureDays || 30,
      minServiceDaysRequired: data.usage?.restrictions?.minServiceDays || 0,
      maxConsecutiveDays: data.usage?.restrictions?.maxDaysPerRequest || 30,
    },
    approvalRules: (data.approvalRules || []).map((rule) => ({
      name: rule.name || "Default Rule",
      priority: rule.priority || 1,
      approvalMode: rule.approvalMode || "SEQUENTIAL",
      conditions: rule.conditions || { operator: "AND", conditions: [] },
      steps: (rule.levels || []).map((lvl) => {
        return {
          order: lvl.rank,
          approverType: "Role",
          roleId: lvl.roleId || lvl.approverType || "",
        };
      }),
    })),
    balancePolicies: (data.balancePolicies || []).map((bp) => ({
      leaveTypeId: bp.leaveTypeId,
      allowCarryForward: bp.allowCarryForward,
      maxCarryForward: bp.maxCarryForward,
      allowNegativeBalance: bp.allowNegativeBalance,
      maxNegativeLimit: bp.maxNegativeLimit,
      roundingRule: bp.roundingRule === "NONE" ? "None" : bp.roundingRule,
    })),
  };
};
