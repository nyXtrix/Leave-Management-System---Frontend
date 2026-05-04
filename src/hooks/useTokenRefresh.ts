import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { authService } from "@/services/auth.service";
import type { RootState } from "@/store";

export const useTokenRefresh = () => {
  const { status } = useSelector((state: RootState) => state.app);
  const intervalRef = useRef<number | null>(null);

  const performRefresh = async () => {
    try {
      console.log("Proactively refreshing session tokens...");
      await authService.refreshToken();
    } catch (error) {
      console.error("Proactive session refresh failed:", error);
    }
  };

  useEffect(() => {
    if (status === "READY") {
      const REFRESH_INTERVAL = 15 * 60 * 1000;
      intervalRef.current = setInterval(performRefresh, REFRESH_INTERVAL);
    } 
    else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [status]);
};
