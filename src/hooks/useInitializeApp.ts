import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "@/store";
import { setAppStatus, setInitializationError } from "@/store/slices/appSlice";
import { setProfile } from "@/store/slices/userSlice";
import { 
  fetchDepartments, 
  fetchRoles, 
  fetchLeaveTypes, 
  fetchGenders 
} from "@/store/slices/lookupSlice";
import { authService } from "@/services/auth.service";
import { withRetry } from "@/utils/retry";
import type { UserProfile } from "@/types/auth.types";


export const useInitializeApp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { status } = useSelector((state: RootState) => state.app);
  const { profile } = useSelector((state: RootState) => state.user);

  const initialize = useCallback(async () => {
    dispatch(setAppStatus("INITIALIZING"));
    
    try {
      if (!profile) {
        const fetchedProfile = await withRetry<UserProfile>(() => authService.getMe());
        dispatch(setProfile(fetchedProfile));
      }

      await Promise.all([
        dispatch(fetchDepartments()).unwrap(),
        dispatch(fetchRoles()).unwrap(),
        dispatch(fetchLeaveTypes()).unwrap(),
        dispatch(fetchGenders()).unwrap(),
      ]);

      dispatch(setAppStatus("READY"));
    } catch (error: any) {
      console.error("Application Initialization Failed:", error);

      if (error?.status === 401) {
        navigate("/login");
        return;
      }

      dispatch(setInitializationError(error.message || "Critical system failure during initialization"));
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (status === "INITIALIZING") {
      initialize();
    }
  }, [status, initialize]);

  return {
    status,
    retry: () => dispatch(setAppStatus("INITIALIZING")),
  };
};
