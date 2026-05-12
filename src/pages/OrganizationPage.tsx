import PageLayout from '@/components/layout/PageLayout';
import OrganizationManagement from '@/features/organization/OrganizationManagement';

export function OrganizationPage() {
  return (
    <PageLayout title='Organization'>
      <OrganizationManagement/>
    </PageLayout>
  );
}
