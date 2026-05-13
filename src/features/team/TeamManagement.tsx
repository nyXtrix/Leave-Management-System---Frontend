import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import EmptyState from "@/components/common/EmptyState";
import { UserRound, Search } from "lucide-react";
import TeamMemberCard from "./components/TeamMemberCard";
import { useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import { teamService } from "@/services/team.service";
import ManagementLayout from "@/components/common/ManagementLayout";
import { Users, Coffee, CheckCircle2, Calendar, Sun } from "lucide-react";

const TeamManagement = () => {
  const navigate = useNavigate();
  const { subdomain } = useParams();
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const PAGE_SIZE = 12;

  const {
    data: response,
    isLoading,
    refetch,
  } = useQuery(
    teamService.getMyTeam,
    [
      {
        page,
        pageSize: PAGE_SIZE,
        searchTerm,
      },
    ],
    { showGlobalLoader: false, ttl: 0 },
  );

  const summary = response?.summary;
  const members = response?.teamMembers?.items || [];
  const totalCount = response?.teamMembers?.totalCount || 0;

  const handleViewProfile = (employeeId: string) => {
    const currentSubdomain = subdomain || user?.subdomain;
    if (!currentSubdomain) return;
    navigate(`/${currentSubdomain}/profile/${employeeId}`);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  return (
    <ManagementLayout
      headerProps={{
        subtitle: (
          <div className="flex items-center gap-3 font-medium">
            <span className="flex items-center gap-1.5 text-slate-600">
              <Users className="h-3.5 w-3.5" />
              {summary?.totalMembers || 0} Total
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="flex items-center gap-1.5 text-emerald-600">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {summary?.availableToday || 0} Available
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="flex items-center gap-1.5 text-amber-600">
              <Coffee className="h-3.5 w-3.5" />
              {summary?.onLeaveToday || 0} On Leave
            </span>
            {(summary?.isWeekOff || summary?.isPublicHoliday) && (
              <>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="flex items-center gap-1.5 text-indigo-600">
                  <Calendar className="h-3.5 w-3.5" />
                  {summary.isWeekOff ? "Week Off" : summary.holidayName}
                </span>
              </>
            )}
          </div>
        ),
        onRefresh: () => refetch(),
        onSearch: handleSearchChange,
        searchPlaceholder: "Search member...",
      }}
      paginationProps={{
        page,
        totalResults: totalCount,
        pageSize: PAGE_SIZE,
        onPageChange: setPage,
      }}
      isLoading={isLoading && !response}
      isEmpty={members.length === 0 && !isLoading}
      emptyState={
        <EmptyState
          icon={searchTerm ? Search : UserRound}
          title={searchTerm ? "No Members Found" : "No Reportees Yet"}
          description={
            searchTerm
              ? "Try adjusting your search term."
              : "Once employees are assigned to report to you, they'll appear here."
          }
          className="py-20"
        />
      }
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4 pb-8 animate-reveal">
        {members.map((member) => (
          <TeamMemberCard
            key={member.id}
            member={member}
            isHoliday={summary?.isPublicHoliday}
            isWeekOff={summary?.isWeekOff}
            holidayName={summary?.holidayName}
            onViewClick={handleViewProfile}
          />
        ))}
      </div>
    </ManagementLayout>
  );
};

export default TeamManagement;
