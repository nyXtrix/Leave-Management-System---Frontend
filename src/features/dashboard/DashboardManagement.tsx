import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import SuperAdminDashboard from "./components/SuperAdminDashboard";
import UserDashboard from "./components/UserDashboard";

const DashboardManagement = () => {
  const { user } = useAuth();

  if (!user) return null;

  const hasAdminAccess = user.permissions["ADMIN_DASHBOARD"]?.actions.includes("VIEW");
  const isSuperAdmin = user.roleCode === "SUPER_ADMIN" || hasAdminAccess;

  return (
    <div className="w-full">
      {isSuperAdmin ? <SuperAdminDashboard /> : <UserDashboard />}
    </div>
  );
};

export default DashboardManagement;
