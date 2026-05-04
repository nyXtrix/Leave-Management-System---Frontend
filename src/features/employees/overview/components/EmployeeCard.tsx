import { Badge } from "@/components/ui/Badge";
import IconButton from "@/components/ui/IconButton";
import type { EmployeeListResponse } from "@/types/employee.types";
import { UserStatus } from "@/types/auth.types";
import { ExternalLink, UserRound } from "lucide-react";

interface EmployeeCardProps {
  employee: EmployeeListResponse;
  onViewClick: (employeeId: string) => void;
}
const EmployeeCard = ({ employee, onViewClick }: EmployeeCardProps) => {
  const getStatusInfo = (status: number) => {
    switch (status) {
      case UserStatus.Activated:
        return { label: "Active", variant: "success" as const };
      case UserStatus.Pending:
        return { label: "Pending", variant: "warning" as const };
      case UserStatus.InActive:
        return { label: "Inactive", variant: "danger" as const };
      case UserStatus.Terminated:
        return { label: "Terminated", variant: "danger" as const };
      default:
        return { label: "Unknown", variant: "default" as const };
    }
  };

  const statusInfo = getStatusInfo(employee.status);

  return (
    <div className="w-full rounded-lg p-4 bg-gray-100/60 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 flex items-center justify-center rounded-full text-white font-semibold text-lg shadow-sm bg-linear-to-br from-primary-500 to-primary-700`}
          >
            <UserRound className="h-6 w-6" />
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              {employee.firstName} {employee.lastName}
              <IconButton
                icon={ExternalLink}
                className="p-0 h-max"
                variant="ghost"
                iconClassName="h-4 text-secondary-500 hover:text-primary-500"
                onClick={() => onViewClick(employee.id)}
              />
            </h3>
            <p className="text-sm text-gray-500">{employee.email}</p>
          </div>
        </div>
        <Badge variant={statusInfo.variant} className="mt-2">
          {statusInfo.label}
        </Badge>
      </div>

      <div className="my-3 border-t border-gray-300" />

      <div className="grid grid-cols-2 gap-y-2 text-sm">
        <p className="text-gray-500 font-medium">Department</p>
        <p className="text-gray-700 font-semibold capitalize">
          {employee.departmentName}
        </p>

        <p className="text-gray-500 font-medium">Role</p>
        <p className="text-gray-700 font-semibold capitalize">
          {employee.roleName}
        </p>

        <p className="text-gray-500 font-medium">Joined On</p>
        <p className="text-gray-700 font-semibold">
          {new Date(employee.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default EmployeeCard;
