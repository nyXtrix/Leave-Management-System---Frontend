import { useParams } from "react-router-dom";
import { useQuery, invalidateQuery } from "@/hooks/useQuery";
import { employeeService } from "@/services/employee.service";
import EmployeeProfileCard from "./EmployeeProfileCard";
import LeaveBalances from "./leave-stats/leave-balance/LeaveBalances";
import LeaveHistoryTimeline from "./leave-stats/LeaveHistoryTimeline";
import LeaveRequestStatusCounts from "./leave-stats/LeaveRequestStatusCounts";
import { type EditProfileFormValues } from "@/validations/users/profile.schema";
import { useAuth } from "@/contexts/AuthContext";
import { useModulePermissions } from "@/hooks/usePermission";
import { Info } from "lucide-react";

const EmployeeProfileManagement = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const { user } = useAuth();
  const { canView } = useModulePermissions("EMPLOYEE_MGMT");

  const idToFetch = employeeId || user?.id;
  const isOwnProfile = !employeeId || employeeId === user?.id;

  if (!isOwnProfile && !canView) {
    return (
      <div className="h-[70dvh] flex flex-col items-center justify-center space-y-4">
        <div className="p-4 bg-rose-50 rounded-full text-rose-500">
          <svg
            className="w-12 h-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m0 0v2m0-2h2m-2 0H10m11-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-800">Access Denied</h2>
          <p className="text-slate-500">
            You don't have permission to view other employee profiles.
          </p>
        </div>
      </div>
    );
  }

  const { data: profile, isLoading, refetch } = useQuery(
    employeeService.getProfile,
    [idToFetch!],
    { enabled: !!idToFetch, showGlobalLoader: false },
  );

  if (isLoading) {
    return (
      <div className="h-[70dvh] flex items-center justify-center">
        <div className="app-loader"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="h-[70dvh] flex items-center justify-center">
        <p className="text-slate-500 font-medium">
          Employee profile not found.
        </p>
      </div>
    );
  }

  const handleUpdateProfile = async (values: EditProfileFormValues) => {
    if (!profile?.employee.id) return;
    await employeeService.updateProfile(profile.employee.id, {
      ...values,
      gender: Number(values.gender),
    });
    invalidateQuery("getProfile");
    refetch();
  };

  const isSuperAdmin = profile.employee.roleCode === "SUPER_ADMIN";

  return (
    <div className="w-full mt-6 mx-auto grid grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[400px_1fr] gap-6 lg:gap-8">
      <aside className="w-full lg:h-full">
        <EmployeeProfileCard 
          employee={profile.employee} 
          onUpdate={handleUpdateProfile} 
        />
      </aside>
      <main className="flex flex-col gap-6 lg:gap-4">
        {isSuperAdmin ? (
          <div className="h-full flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-secondary-200 shadow-sm text-center space-y-4">
            <div className="p-4 bg-secondary-200 rounded-full text-secondary-400">
             <Info className="w-12 h-12 text-primary-500" strokeWidth={1.5}/>
            </div>
            <div>
              <h3 className="text-xl font-bold text-secondary-800">Statistics Not Applicable</h3>
              <p className="text-secondary-500 max-w-sm mx-auto mt-2">
                Leave balances and tracking are not enabled for system administrator accounts.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              <LeaveBalances leaveBalances={profile.leaveBalances} />
              <LeaveRequestStatusCounts
                total={profile.requestStatusCounts.total}
                pending={profile.requestStatusCounts.pending}
                approved={profile.requestStatusCounts.approved}
                rejected={profile.requestStatusCounts.rejected}
              />
            </div>
            <LeaveHistoryTimeline leaveHistory={profile.leaveHistory} />
          </>
        )}
      </main>
    </div>
  );
};

export default EmployeeProfileManagement;
