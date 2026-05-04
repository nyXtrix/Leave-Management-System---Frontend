import PageLayout from "@/components/layout/PageLayout";
import UserOnboardManagement from "@/features/employees/user-onboard/UserOnboardManagement";

export function InviteUserPage() {
  return (
    <PageLayout title="Onboard Employees">
      <UserOnboardManagement />
    </PageLayout>
  );
}

export default InviteUserPage;
