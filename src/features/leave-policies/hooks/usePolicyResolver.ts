import { useMemo } from "react";
import type { MasterLeavePolicy } from "../types/policy.types";
import { PolicyResolver } from "../engine/PolicyResolver";

export const usePolicyResolver = (allPolicies: MasterLeavePolicy[]) => {
  const resolvedPolicy = useMemo(() => {
    return PolicyResolver.resolve(allPolicies || []);
  }, [allPolicies]);

  return {
    resolvedPolicy,
  };
};

export default usePolicyResolver;
