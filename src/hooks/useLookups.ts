import { useQuery } from "./useQuery";
import { lookupService } from "@/services/lookup.service";
import type { LookupItem } from "@/store/slices/lookupSlice";

export const useLookups = () => {
  const departments = useQuery<LookupItem[], []>(lookupService.getDepartments, [], {
    showGlobalLoader: false,
    ttl: 30 * 60 * 1000,
  });

  const roles = useQuery<LookupItem[], []>(lookupService.getRoles, [], {
    showGlobalLoader: false,
    ttl: 30 * 60 * 1000,
  });

  const genders = useQuery<LookupItem[], []>(lookupService.getGenders, [], {
    showGlobalLoader: false,
    ttl: 30 * 60 * 1000,
  });

  const leaveTypes = useQuery<LookupItem[], []>(lookupService.getLeaveTypes, [], {
    showGlobalLoader: false,
    ttl: 30 * 60 * 1000,
  });

  return {
    departments,
    roles,
    genders,
    leaveTypes,
    isLoading: departments.isLoading || roles.isLoading || genders.isLoading || leaveTypes.isLoading,
    error: departments.error || roles.error || genders.error || leaveTypes.error,
  };
};
