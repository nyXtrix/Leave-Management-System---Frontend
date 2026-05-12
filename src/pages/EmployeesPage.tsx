import PageLayout from "@/components/layout/PageLayout";
import EmployeesManagement from "@/features/employees/overview/EmployeesManagement";

export function EmployeesPage() {
  return (
    <PageLayout title="Employee Management">
      <EmployeesManagement />
    </PageLayout>
  );
}
