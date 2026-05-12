import type { MasterLeavePolicy } from "../types/policy.types";

export const DEFAULT_LEAVE_POLICY: Partial<MasterLeavePolicy> = {
  calendar: {
    weekOffs: [
      { day: "SAT", weekOfMonth: "ALL", isHalfDay: false },
      { day: "SUN", weekOfMonth: "ALL", isHalfDay: false },
    ],
    holidays: [],
    compOffEligibility: {
      enabled: false,
      minHoursForHalfDay: 4,
      minHoursForFullDay: 8,
    },
  },
  usage: {
    sandwichEnabled: true,
    includeWeekendsInSandwich: true,
    includeHolidaysInSandwich: true,
    clubbingRules: [],
    restrictions: {
      minServiceDays: 0,
      minDaysPerRequest: 1,
      maxDaysPerRequest: 30,
      maxLeavesPerMonth: 10,
      maxLeavesPerYear: 30,
    },
    timing: {
      advanceNoticeDays: 2,
      allowBackdated: false,
      backdatedLimitDays: 0,
      maxFutureDays: 90,
    },
    blackoutPeriods: [],
  },
};
