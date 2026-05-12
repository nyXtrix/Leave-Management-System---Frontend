import PageLayout from "@/components/layout/PageLayout";
import LeaveTypesManagement from "@/features/leave-types/LeaveTypesManagement";

export function LeaveManagementPage() {
  return (
    <PageLayout title="Leave Management">
      <LeaveTypesManagement />
    </PageLayout>
  );
}
