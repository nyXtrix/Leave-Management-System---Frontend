import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { 
  fetchDepartments, 
  fetchRoles, 
  fetchGenders, 
  fetchLeaveTypes 
} from "@/store/slices/lookupSlice";

export const useLookups = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { departments, roles, genders, leaveTypes } = useSelector(
    (state: RootState) => state.lookups
  );

  useEffect(() => {
    if (departments.status === "idle") dispatch(fetchDepartments());
    if (roles.status === "idle") dispatch(fetchRoles());
    if (genders.status === "idle") dispatch(fetchGenders());
    if (leaveTypes.status === "idle") dispatch(fetchLeaveTypes());
  }, [dispatch, departments.status, roles.status, genders.status, leaveTypes.status]);

  return {
    departments: {
      data: departments.data,
      isLoading: departments.status === "loading",
      error: departments.error,
    },
    roles: {
      data: roles.data,
      isLoading: roles.status === "loading",
      error: roles.error,
    },
    genders: {
      data: genders.data,
      isLoading: genders.status === "loading",
      error: genders.error,
    },
    leaveTypes: {
      data: leaveTypes.data,
      isLoading: leaveTypes.status === "loading",
      error: leaveTypes.error,
    },
    isLoading:
      departments.status === "loading" ||
      roles.status === "loading" ||
      genders.status === "loading" ||
      leaveTypes.status === "loading",
    error:
      departments.error ||
      roles.error ||
      genders.error ||
      leaveTypes.error,
  };
};
