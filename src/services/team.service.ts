import BaseRequestProvider from "../lib/api/BaseRequestProvider";
import type { PaginatedResult, QueryParams } from "@/types/utils";

export interface TeamMemberResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  departmentName: string;
  roleName: string;
  status: number;
  joinedDate: string;
  onLeaveToday: boolean;
  leaveType?: string;
  leaveReturnDate?: string;
}

export interface TeamSummaryResponse {
  totalMembers: number;
  onLeaveToday: number;
  availableToday: number;
  isPublicHoliday: boolean;
  holidayName?: string;
  isWeekOff: boolean;
}

export interface TeamResponse {
  summary: TeamSummaryResponse;
  teamMembers: PaginatedResult<TeamMemberResponse>;
}

export const teamService = {
  async getMyTeam(params: QueryParams): Promise<TeamResponse> {
    const queryParams: Record<string, string> = {
      page: String(params.page || 1),
      pageSize: String(params.pageSize || 12),
      searchTerm: params.searchTerm || "",
    };

    return BaseRequestProvider.get<TeamResponse>(
      "/organization/team",
      queryParams
    );
  }
};
