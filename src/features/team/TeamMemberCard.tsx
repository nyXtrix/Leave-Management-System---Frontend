import { Badge } from "@/components/ui/Badge";
import IconButton from "@/components/ui/IconButton";
import {
  UserRound,
  ExternalLink,
  Coffee,
  CheckCircle2,
  Plane,
  HeartPulse,
  Building2,
  ShieldCheck,
  CalendarDays,
  Minus,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  departmentName: string;
  roleName: string;
  status: "Active" | "Pending" | "Inactive";
  joinedDate: string;
  onLeaveToday: boolean;
  leaveType?: string;
  leaveReturnDate?: string;
}

const LEAVE_ICONS: Record<string, React.ElementType> = {
  "Annual Leave": Plane,
  "Sick Leave": HeartPulse,
  default: Coffee,
};

interface TeamMemberCardProps {
  member: TeamMember;
  onViewClick: (id: string) => void;
}   

const TeamMemberCard = ({ member, onViewClick }: TeamMemberCardProps) => {
  const LeaveIcon = member.leaveType
    ? (LEAVE_ICONS[member.leaveType] ?? LEAVE_ICONS["default"])
    : LEAVE_ICONS["default"];

  const statusVariant =
    member.status === "Active"
      ? ("success" as const)
      : member.status === "Pending"
      ? ("warning" as const)
      : ("danger" as const);

  return (
    <div className="w-full rounded-lg p-4 bg-gray-100/60 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 flex items-center justify-center rounded-full text-white font-semibold text-lg shadow-sm bg-linear-to-br from-primary-500 to-primary-700">
              <UserRound className="h-6 w-6" />
            </div>
            <span
              className={cn(
                "absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white flex items-center justify-center",
                member.onLeaveToday ? "bg-amber-400" : "bg-emerald-500"
              )}
            >
              {member.onLeaveToday ? (
                <Minus className="h-2.5 w-2.5 text-white" strokeWidth={3} />
              ) : (
                <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
              )}
            </span>
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              {member.firstName} {member.lastName}
              <IconButton
                icon={ExternalLink}
                className="p-0 h-max"
                variant="ghost"
                iconClassName="h-4 text-secondary-500 hover:text-primary-500"
                onClick={() => onViewClick(member.id)}
              />
            </h3>
            <p className="text-sm text-gray-500">{member.email}</p>
          </div>
        </div>

        <Badge variant={statusVariant} className="mt-2 shrink-0">
          {member.status}
        </Badge>
      </div>

      {/* Divider */}
      <div className="my-3 border-t border-gray-300" />

      {/* Today's availability */}
      <div
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg mb-3 border",
          member.onLeaveToday
            ? "bg-amber-50 border-amber-200"
            : "bg-emerald-50 border-emerald-100"
        )}
      >
        {member.onLeaveToday ? (
          <>
            <LeaveIcon className="h-3.5 w-3.5 text-amber-500 shrink-0" />
            <div>
              <span className="text-[11px] font-bold text-amber-700">
                {member.leaveType ?? "On Leave"}
              </span>
              {member.leaveReturnDate && (
                <span className="text-[10px] text-amber-500 ml-1">
                  · Back {member.leaveReturnDate}
                </span>
              )}
            </div>
          </>
        ) : (
          <>
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            <span className="text-[11px] font-bold text-emerald-700">
              Available Today
            </span>
          </>
        )}
      </div>

      {/* Meta grid */}
      <div className="grid grid-cols-2 gap-y-2 text-sm">
        <p className="text-gray-500 font-medium flex items-center gap-1.5">
          <Building2 className="h-3.5 w-3.5 text-gray-400" />
          Department
        </p>
        <p className="text-gray-700 font-semibold capitalize truncate">
          {member.departmentName}
        </p>

        <p className="text-gray-500 font-medium flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-gray-400" />
          Role
        </p>
        <p className="text-gray-700 font-semibold capitalize truncate">
          {member.roleName}
        </p>

        <p className="text-gray-500 font-medium flex items-center gap-1.5">
          <CalendarDays className="h-3.5 w-3.5 text-gray-400" />
          Joined On
        </p>
        <p className="text-gray-700 font-semibold">
          {new Date(member.joinedDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

export default TeamMemberCard;
