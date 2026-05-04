import IconButton from "@/components/ui/IconButton";
import type { UserProfile } from "@/types/auth.types";
import {
  UserRound,
  Mail,
  Building2,
  SquarePen,
  UserCheck,
  VenusAndMars,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface EmployeeProfileCardProps {
  employee: UserProfile;
}

const EmployeeProfileCard = ({ employee }: EmployeeProfileCardProps) => {

  return (
    <div className="relative w-full h-full bg-white rounded-xl border border-secondary-200 shadow-sm flex flex-col p-8 animate-reveal">
      <IconButton
        icon={SquarePen}
        size="sm"
        variant="ghost"
        className="absolute top-6 right-6 p-2 hover:bg-secondary-50 transition-all text-secondary-500"
      />

      <div className="flex flex-col items-center text-center space-y-5">
        <div className="p-6 rounded-full bg-linear-to-br from-primary-500 to-primary-600">
          <UserRound className="h-10 w-10 text-white" />
        </div>

        <div className="space-y-1">
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            {employee.firstName} {employee.lastName}
          </h2>
          <p className="text-secondary-600 font-semibold text-lg">
            {employee.role}
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Badge
              variant={employee.status === 1 ? "success" : "default"}
              className="px-3"
            >
              {employee.status === 1 ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-secondary-300/80" />

      <div className="flex-1">
        <div className="space-y-2">
          <h3 className=" text-secondary-400 text-base mt-3">Work Placement</h3>

          <div className="space-y-3">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-secondary-200/30">
              <div className="p-3 bg-white rounded-xl text-secondary-500 shadow-sm">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-secondary-400">
                  Department
                </p>
                <p className="text-sm font-bold text-secondary-600 truncate">
                  {employee.department}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-secondary-200/30">
              <div className="p-3 bg-white rounded-xl text-secondary-500 shadow-sm group-hover:text-primary-600">
                <UserCheck className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-secondary-400">
                  Direct Manager
                </p>
                <p className="text-sm font-bold text-secondary-600 truncate">
                  {employee.managerName}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-base font-bold text-secondary-400 pt-4">
            Contact & Personal Information
          </h3>

          <div className="space-y-3">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary-100 text-sm group">
              <div className="p-2 bg-secondary-50 rounded-xl bg-white text-secondary-400 group-hover:text-primary-600 transition-colors">
                <VenusAndMars className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-secondary-400">
                  Gender
                </p>
                <span className="text-slate-600 font-bold">
                  {employee.gender === 1 ? "Male" : "Female"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary-100 text-sm group">
              <div className="p-2 bg-white rounded-xl text-secondary-400 group-hover:text-primary-600 transition-colors">
                <Mail className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-secondary-400">
                  Official Email
                </p>
                <span className="text-slate-600 font-bold">
                  {employee.email}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfileCard;
