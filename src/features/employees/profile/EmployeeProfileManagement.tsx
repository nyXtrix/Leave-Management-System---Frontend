import EmployeeProfileCard from "./EmployeeProfileCard";
import LeaveBalances from "./leave-stats/leave-balance/LeaveBalances";
import LeaveHistoryTimeline from "./leave-stats/LeaveHistoryTimeline";
import LeaveRequestStatusCounts from "./leave-stats/LeaveRequestStatusCounts";
import type { UserProfile } from "@/types/auth.types";


const LEAVE_BALANCES = [
  {
    id: "1",
    type: "CUSTOM",
    label: "Annual Leave",
    total: 20,
    used: 8,
    available: 12,
    pending: 0,
  },
  {
    id: "2",
    type: "SICK",
    label: "Sick Leave",
    total: 10,
    used: 4,
    available: 6,
    pending: 0,
  },
  {
    id: "3",
    type: "CASUAL",
    label: "Casual Leave",
    total: 8,
    used: 2,
    available: 6,
    pending: 0,
  },
  {
    id: "4",
    type: "CUSTOM",
    label: "Maternity Leave",
    total: 90,
    used: 30,
    available: 60,
    pending: 0,
  },
  {
    id: "5",
    type: "CUSTOM",
    label: "Paternity Leave",
    total: 15,
    used: 5,
    available: 10,
    pending: 0,
  },
  {
    id: "6",
    type: "CUSTOM",
    label: "Holiday Leave",
    total: 5,
    used: 1,
    available: 4,
    pending: 0,
  },
];

const employeeData: UserProfile = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@flowoff.com",
  gender: 1, // Male
  department: "Product Engineering",
  role: "Lead Software Architect",
  roleCode: "LSA",
  managerName: "Sarah Phillips",
  status: 1, // Active
  subdomain: "acme-corp",
  tenantName: "Acme Corporation Ltd.",
  permissions: {},
  updatedDate: new Date().toISOString(),
};

const MOCK_LEAVE_DATA = [
  { month: "January", Annual: 4, Sick: 1, Casual: 2, Holiday: 1 },
  { month: "February", Annual: 2, Sick: 3, Paternity: 10 },
  { month: "March", Annual: 5, Casual: 1 },
  { month: "April", Sick: 2 },
  { month: "May", Annual: 8, Casual: 2 },
  { month: "June", Annual: 3, Sick: 1, Holiday: 1 },
];

const EmployeeProfileManagement = () => {
  return (
      <div className="w-full mt-6 mx-auto grid grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[400px_1fr] gap-6 lg:gap-8">
        <aside className="w-full lg:h-full">
          <EmployeeProfileCard employee={employeeData} />
        </aside>
        <main className="flex flex-col gap-6 lg:gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <LeaveBalances leaveBalances={LEAVE_BALANCES} />
            <LeaveRequestStatusCounts
              total={30}
              pending={4}
              approved={18}
              rejected={8}
            />
          </div>
          <LeaveHistoryTimeline leaveHistory={MOCK_LEAVE_DATA} />
        </main>
      </div>
  );
};

export default EmployeeProfileManagement;
