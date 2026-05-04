import PageLayout from '@/components/layout/PageLayout'
import EmployeeProfileManagement from '@/features/employees/profile/EmployeeProfileManagement'

const EmployeeProfile = () => {
  return (
    <PageLayout title='Profile'>
        <EmployeeProfileManagement/>
    </PageLayout>
  )
}

export default EmployeeProfile