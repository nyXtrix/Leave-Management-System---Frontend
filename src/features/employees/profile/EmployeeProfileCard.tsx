import React, { useState } from "react";
import IconButton from "@/components/ui/IconButton";
import {
  UserRound,
  Mail,
  Building2,
  SquarePen,
  UserCheck,
  VenusAndMars,
  MoreVertical,
  Pencil,
  Send,
  UserX,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import { invitationService } from "@/services/invitation.service";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { UserStatus } from "@/types/auth.types";
import EditProfileModal from "./components/EditProfileModal";
import { type EditProfileFormValues } from "@/validations/users/profile.schema";
import { useModulePermissions } from "@/hooks/usePermission";

export interface ProfileBasicInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: number;
  status: number;
  role: string;
  roleId: string;
  roleCode: string;
  department?: string | null;
  departmentId?: string | null;
  managerName?: string | null;
  managerId?: string | null;
}

interface EmployeeProfileCardProps {
  employee: ProfileBasicInfo;
  onUpdate?: (values: EditProfileFormValues) => void;
}

const EmployeeProfileCard = ({ employee, onUpdate }: EmployeeProfileCardProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isResendModalOpen, setIsResendModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const { canUpdate, canCreate } = useModulePermissions("EMPLOYEE_MGMT");

  const isPending = employee.status === UserStatus.Pending;
  const isInactive = employee.status === UserStatus.InActive;
  const isSuperAdmin = employee.roleCode === "SUPER_ADMIN";

  const handleResendInvitation = () => {
    setIsActionLoading(true);
    invitationService.resendInvitation(employee.id)
      .then(() => setIsResendModalOpen(false))
      .finally(() => setIsActionLoading(false));
  };

  const handleCancelInvitation = () => {
    setIsActionLoading(true);
    invitationService.cancelInvitation(employee.id)
      .then(() => setIsCancelModalOpen(false))
      .finally(() => setIsActionLoading(false));
  };

  return (
    <div className="relative w-full h-full bg-white rounded-xl border border-secondary-200 shadow-sm flex flex-col p-8 animate-reveal">
      {(canUpdate || canCreate) && (
        <div className="absolute top-6 right-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton
                icon={MoreVertical}
                size="sm"
                variant="ghost"
                className="p-2 hover:bg-secondary-50 transition-all text-secondary-500"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[180px] rounded-xl border-secondary-200">
              {canUpdate && (
                <DropdownMenuItem asChild onClick={() => setIsEditModalOpen(true)}>
                  <IconButton 
                    icon={Pencil} 
                    variant="ghost" 
                    className="w-full justify-start p-2"
                    iconClassName="h-4 w-4"
                  >
                    Edit Profile
                  </IconButton>
                </DropdownMenuItem>
              )}
              
              {canCreate && isInactive && (
                <DropdownMenuItem asChild onClick={() => setIsResendModalOpen(true)}>
                  <IconButton 
                    icon={Send} 
                    variant="ghost" 
                    className="w-full justify-start p-2"
                    iconClassName="h-4 w-4"
                  >
                    Invite User
                  </IconButton>
                </DropdownMenuItem>
              )}


              {canCreate && isPending && (
                <>
                  <DropdownMenuItem asChild onClick={() => setIsResendModalOpen(true)}>
                    <IconButton 
                      icon={Send} 
                      variant="ghost" 
                      className="w-full justify-start p-2"
                      iconClassName="h-4 w-4"
                    >
                      Resend Invite
                    </IconButton>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild onClick={() => setIsCancelModalOpen(true)}>
                    <IconButton 
                      icon={UserX} 
                      variant="ghost" 
                      className="w-full justify-start p-2 text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                      iconClassName="h-4 w-4"
                    >
                      Cancel Invite
                    </IconButton>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

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
              variant={
                employee.status === UserStatus.Activated 
                  ? "success" 
                  : employee.status === UserStatus.Pending 
                    ? "warning" 
                    : "default"
              }
              className="px-3"
            >
              {employee.status === UserStatus.Activated 
                ? "Active" 
                : employee.status === UserStatus.Pending 
                  ? "Pending" 
                  : "Inactive"}
            </Badge>
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-secondary-300/80" />

      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        employee={employee} 
        onSubmit={onUpdate}
      />

      <Modal
        isOpen={isResendModalOpen}
        onClose={() => setIsResendModalOpen(false)}
        title="Resend Invitation"
        description={`Are you sure you want to resend the invitation email to ${employee.firstName} ${employee.lastName}?`}
        primaryBtnText="Resend"
        primaryBtnIcon={Send}
        primaryBtnLoading={isActionLoading}
        onConfirm={handleResendInvitation}
      >
        <div className="flex items-center gap-3 p-4 bg-primary-50 text-secondary-500 rounded-xl border border-primary-100">
          <Mail className="h-5 w-5 text-primary-600" />
          <p className="text-sm font-medium">This will send a new invitation link to <span className="font-semibold text-primary-500">{employee.email}</span>.</p>
        </div>
      </Modal>

      <Modal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        title="Cancel Invitation"
        description={`Are you sure you want to cancel the invitation for ${employee.firstName} ${employee.lastName}?`}
        primaryBtnText="Cancel Invitation"
        primaryBtnIcon={UserX}
        primaryBtnClassName="bg-rose-500 hover:bg-rose-600 border-rose-500"
        primaryBtnLoading={isActionLoading}
        onConfirm={handleCancelInvitation}
      >
        <div className="flex items-center gap-3 p-4 bg-rose-50 text-rose-700 rounded-xl border border-rose-100">
          <AlertCircle className="h-5 w-5" />
          <p className="text-sm font-medium">This action will deactivate the invitation link and remove the pending employee record.</p>
        </div>
      </Modal>

      <div className="flex-1">
        {!isSuperAdmin && (
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
        )}

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
                  {employee.gender === 1 ? "Male" : employee.gender === 2 ? "Female" : employee.gender === 3 ? "Other" : "Unknown"}
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
