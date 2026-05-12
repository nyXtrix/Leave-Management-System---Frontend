import type { MasterLeavePolicy, PolicyScope } from "../types/policy.types";

const SCOPE_PRIORITY: Record<string, number> = {
  ORG: 1,
  LOCATION: 2,
  DEPARTMENT: 3,
  ROLE: 4,
  EMPLOYEE: 5,
};

const getPriority = (scope: PolicyScope): number => {
  return SCOPE_PRIORITY[scope.toUpperCase()] || 0;
};

export class PolicyResolver {

  static resolve(policies: MasterLeavePolicy[]): MasterLeavePolicy {
    if (!policies || policies.length === 0) {
      throw new Error("No policies provided for resolution");
    }

    const sortedPolicies = [...policies].sort(
      (a, b) => getPriority(a.scope) - getPriority(b.scope)
    );

    return sortedPolicies.reduce((acc, current) => {
      return {
        ...acc,
        ...current,
        calendar: { ...(acc.calendar || {}), ...(current.calendar || {}) },
        usage: { ...(acc.usage || {}), ...(current.usage || {}) },
        definitions: this.mergeDefinitions(acc.definitions || [], current.definitions || []),
        balancePolicies: this.mergeBalancePolicies(acc.balancePolicies || [], current.balancePolicies || []),
        approvalRules: [...(acc.approvalRules || []), ...(current.approvalRules || [])].sort((a, b) => (b.priority || 0) - (a.priority || 0)),
      } as MasterLeavePolicy;
    }, sortedPolicies[0]);
  }

  private static mergeDefinitions(base: any[], override: any[]) {
    const map = new Map();
    base.forEach(d => map.set(d.leaveTypeId, d));
    override.forEach(d => map.set(d.leaveTypeId, { ...map.get(d.leaveTypeId), ...d }));
    return Array.from(map.values());
  }

  private static mergeBalancePolicies(base: any[], override: any[]) {
    const map = new Map();
    base.forEach(d => map.set(d.leaveTypeId, d));
    override.forEach(d => map.set(d.leaveTypeId, { ...map.get(d.leaveTypeId), ...d }));
    return Array.from(map.values());
  }
}
