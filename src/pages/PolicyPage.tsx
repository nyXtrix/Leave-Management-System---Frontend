import PageLayout from '@/components/layout/PageLayout';
import LeavePolicyManagement from '@/features/leave-policies/LeavePolicyManagement';

export function PolicyPage() {
  return (
    <PageLayout 
      title="Policy Management" 
      subtitle="Define organizational rules, accruals, and approval workflows"
    >
      <LeavePolicyManagement />
    </PageLayout>
  );
}
