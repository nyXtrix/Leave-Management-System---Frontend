import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Users2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import TeamManagement from "@/features/team/TeamManagement";

export const TeamPage = () => {
  return (
    <PageLayout title="Team Overview">
      <TeamManagement />
    </PageLayout>
  );
};

export default TeamPage;
