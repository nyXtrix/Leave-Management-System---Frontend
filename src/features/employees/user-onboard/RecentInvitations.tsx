import {
  Clock,
  CheckCircle2,
  Send,
  Mail,
  UserRound,
  ExternalLink,
} from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import IconButton from "@/components/ui/IconButton";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import { UserStatus, type UserProfile } from "@/types/auth.types";
import { useNavigate } from "react-router-dom";
import EmptyState from "@/components/common/EmptyState";
import { UserPlus } from "lucide-react";

// const recentInvites = [
//   {
//     id: 1,
//     name: "Sarah Connor",
//     email: "sarah@company.com",
//     role: "Engineering Manager",
//     status: "Pending",
//     time: "10 mins ago",
//   },
//   {
//     id: 2,
//     name: "Alex Johnson",
//     email: "alex.j@company.com",
//     role: "Frontend Developer",
//     status: "Active",
//     time: "2 hours ago",
//   },
// ];

interface RecentInvitationsProps {
  recentInvites:UserProfile[];
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const RecentInvitations = ({ recentInvites, isOpen, onClose,onOpen }: RecentInvitationsProps) => {
  const navigate = useNavigate();

  const handleNavigateToProfile = (id:string) =>{
    navigate(`../employee/profile/${id}`);
  }
  return (
    <>
      <SectionCard
        title="Recent Invitations"
        info="The latest employees invited to the platform."
        tooltipAlign="end"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          {recentInvites.length > 0 ? (
            recentInvites.map((invite) => (
              <div
                key={invite.id}
                className="flex-1 p-3 border border-slate-100 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors group relative"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 shrink-0 rounded-full bg-linear-to-r from-primary-500 to-primary-600 flex items-center justify-center font-bold text-sm">
                      <UserRound className="h-4 w-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-slate-800 truncate">
                        {invite.firstName + " " + invite.lastName}
                      </h4>
                      <p className="text-[11px] font-medium text-slate-500 truncate">
                        {invite.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 absolute top-2 right-2">
                    {invite.status === UserStatus.Pending && (
                      <IconButton
                        variant="ghost"
                        icon={Send}
                        className="p-0"
                        tooltip="Resend Invitation"
                        onClick={onOpen}
                      />
                    )}
                    <IconButton
                      variant="ghost"
                      icon={ExternalLink}
                      className="p-0"
                      tooltip="View Details"
                      onClick={() => handleNavigateToProfile(invite.id)}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3 text-[11px] font-medium text-slate-500">
                  <Mail className="h-3 w-3 text-primary-500 shrink-0" />
                  <span className="truncate">{invite.email}</span>
                </div>

                <div className="flex items-center justify-between pt-2.5 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    {invite.status === UserStatus.Pending ? (
                      <>
                        <Clock className="h-3.5 w-3.5 text-amber-500" />
                        <span className="text-[11px] font-bold text-amber-600">
                          Pending
                        </span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-[11px] font-bold text-emerald-600">
                          {invite.status === UserStatus.Activated ? "Active" : "Inactive"}
                        </span>
                      </>
                    )}
                  </div>
                  <span className="text-[10px] font-medium text-slate-400">
                    {invite.updatedDate}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <EmptyState
              title="No Recent Invitations"
              description="You haven't invited any employees recently."
              icon={UserPlus}
              compact={true}
              className="w-full"
            />
          )}
        </div>
      </SectionCard>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={() => {}}
        title="Resend Invitation"
        message="Are you sure you want to resend the invitation?"
        confirmText="Resend"
        cancelText="Cancel"
        variant="warning"
        showCancelButton={true}
        isLoading={false}
      />
    </>
  );
};

export default RecentInvitations;
