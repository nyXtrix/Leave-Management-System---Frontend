import api from "@/lib/api/BaseRequestProvider";
import type { LookupItem } from "@/store/slices/lookupSlice";

export const lookupService = {
  getDepartments: async (): Promise<LookupItem[]> => {
    return api.get<LookupItem[]>("/Lookups/departments");
  },
  
  getRoles: async (): Promise<LookupItem[]> => {
    return api.get<LookupItem[]>("/Lookups/roles");
  },
  
  getLeaveTypes: async (): Promise<LookupItem[]> => {
    return api.get<LookupItem[]>("/Lookups/leave-types");
  },
  
  getGenders: async (): Promise<LookupItem[]> => {
    return api.get<LookupItem[]>("/Lookups/genders");
  }
};
