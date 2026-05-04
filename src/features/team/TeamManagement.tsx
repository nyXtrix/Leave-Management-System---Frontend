import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import EmptyState from "@/components/common/EmptyState";
import { Users, UserRound, Coffee, CheckCircle2 } from "lucide-react";
import TeamMemberCard, { type TeamMember } from "./TeamMemberCard";
import Pagination from "@/components/tables/Pagination";
import { useState } from "react";

const STATIC_TEAM: TeamMember[] = [
  {
    id: "1",
    firstName: "Sarah",
    lastName: "Connor",
    email: "sarah.connor@company.com",
    departmentName: "Engineering",
    roleName: "Senior Developer",
    status: "Active",
    joinedDate: "2023-03-12",
    onLeaveToday: true,
    leaveType: "Annual Leave",
    leaveReturnDate: "May 7",
  },
  {
    id: "2",
    firstName: "James",
    lastName: "Hartwell",
    email: "j.hartwell@company.com",
    departmentName: "Engineering",
    roleName: "Frontend Developer",
    status: "Active",
    joinedDate: "2022-11-05",
    onLeaveToday: false,
  },
  {
    id: "3",
    firstName: "Priya",
    lastName: "Sharma",
    email: "p.sharma@company.com",
    departmentName: "Engineering",
    roleName: "QA Engineer",
    status: "Active",
    joinedDate: "2024-01-20",
    onLeaveToday: true,
    leaveType: "Sick Leave",
    leaveReturnDate: "May 5",
  },
  {
    id: "4",
    firstName: "Carlos",
    lastName: "Mendez",
    email: "c.mendez@company.com",
    departmentName: "Engineering",
    roleName: "Backend Developer",
    status: "Active",
    joinedDate: "2023-07-18",
    onLeaveToday: false,
  },
  {
    id: "5",
    firstName: "Aisha",
    lastName: "Okonkwo",
    email: "a.okonkwo@company.com",
    departmentName: "Engineering",
    roleName: "DevOps Engineer",
    status: "Active",
    joinedDate: "2022-06-01",
    onLeaveToday: false,
  },
  {
    id: "6",
    firstName: "Ethan",
    lastName: "Brooks",
    email: "e.brooks@company.com",
    departmentName: "Engineering",
    roleName: "Mobile Developer",
    status: "Pending",
    joinedDate: "2026-04-10",
    onLeaveToday: false,
  },
];

const TeamManagement = () => {
  const navigate = useNavigate();
  const { subdomain } = useParams();
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 12;

  const onLeaveCount = STATIC_TEAM.filter((m) => m.onLeaveToday).length;
  const availableCount = STATIC_TEAM.length - onLeaveCount;

  const handleViewProfile = (employeeId: string) => {
    const currentSubdomain = subdomain || user?.subdomain;
    if (!currentSubdomain) return;
    navigate(`/${currentSubdomain}/profile/${employeeId}`);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-210px)] animate-reveal">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 sticky top-0 bg-white z-10 pb-3 mb-6">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border bg-slate-50 border-slate-200">
            <Users className="h-3.5 w-3.5 text-slate-500" />
            <span className="text-xs font-bold text-slate-700">
              {STATIC_TEAM.length} Members
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border bg-emerald-50 border-emerald-100">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-xs font-bold text-emerald-700">
              {availableCount} In
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border bg-amber-50 border-amber-100">
            <Coffee className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-xs font-bold text-amber-700">
              {onLeaveCount} Out
            </span>
          </div>
        </div>
      </div>

      {STATIC_TEAM.length > 0 ? (
        <>
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {STATIC_TEAM.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map(
                (member) => (
                  <TeamMemberCard
                    key={member.id}
                    member={member}
                    onViewClick={handleViewProfile}
                  />
                ),
              )}
            </div>
          </div>
          <div className="sticky bottom-0 bg-white pt-4 border-t border-slate-100 z-10 mt-auto">
            <Pagination
              page={page}
              totalResults={STATIC_TEAM.length}
              pageSize={PAGE_SIZE}
              onPageChange={setPage}
              className="w-full rounded-b-xl"
            />
          </div>
        </>
      ) : (
        <EmptyState
          icon={UserRound}
          title="No Reportees Yet"
          description="Once employees are assigned to report to you, they'll appear here."
          className="py-20"
        />
      )}
    </div>
  );
};

export default TeamManagement;
