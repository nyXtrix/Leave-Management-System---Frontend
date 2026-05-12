import PageLayout from "@/components/layout/PageLayout";
import LeaveManagement from "@/features/leaves/LeaveManagement";

export function LeavesPage() {

  return (
    <PageLayout title="My leaves">
      <LeaveManagement />
    </PageLayout>
  );
}
