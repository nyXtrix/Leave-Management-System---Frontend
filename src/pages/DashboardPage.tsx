import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import DashboardManagement from "@/features/dashboard/DashboardManagement";
import { useAuth } from "@/contexts/AuthContext";

export function DashboardPage() {
  const { user } = useAuth();
  
  return (
    <PageLayout 
      title="Dashboard" 
      subtitle={`Welcome back, ${user?.firstName} 👋`}
    >
      <DashboardManagement />
    </PageLayout>
  );
}

export default DashboardPage;
