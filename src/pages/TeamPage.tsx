import PageLayout from "@/components/layout/PageLayout";
import TeamManagement from "@/features/team/TeamManagement";

export const TeamPage = () => {
  return (
    <PageLayout title="Team Overview">
      <TeamManagement />
    </PageLayout>
  );
};

export default TeamPage;
