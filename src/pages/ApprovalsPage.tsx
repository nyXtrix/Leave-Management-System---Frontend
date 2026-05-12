import PageLayout from "@/components/layout/PageLayout";
import ApprovalManagement from "@/features/approvals/ApprovalManagement";

export function ApprovalsPage() {
  return (
    <PageLayout title="Approvals">
      <ApprovalManagement />
    </PageLayout>
  );
}
