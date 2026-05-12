import { useState, useEffect } from "react";
import { Users, Coffee, CheckCircle2, Calendar, Sun, Search } from "lucide-react";
import type { TeamSummaryResponse } from "@/services/team.service";
import InputWithIcon from "@/components/common/inputs/InputWithIcon";
import { useDebounce } from "@/hooks/useDebounce";

interface TeamHeaderProps {
  summary?: TeamSummaryResponse;
  onSearchChange: (value: string) => void;
}

const TeamHeader = ({ summary, onSearchChange }: TeamHeaderProps) => {
  const [inputValue, setInputValue] = useState("");
  const debouncedSearch = useDebounce(inputValue, 400);

  useEffect(() => {
    onSearchChange(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 sticky top-0 bg-white z-10 pb-3 mb-6">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border bg-slate-50 border-slate-200">
          <Users className="h-3.5 w-3.5 text-slate-500" />
          <span className="text-xs font-bold text-slate-700">
            {summary?.totalMembers || 0} Members
          </span>
        </div>

        {!summary?.isPublicHoliday && !summary?.isWeekOff && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border bg-emerald-50 border-emerald-100">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-xs font-bold text-emerald-700">
              {summary?.availableToday || 0} Available
            </span>
          </div>
        )}

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border bg-amber-50 border-amber-100">
          <Coffee className="h-3.5 w-3.5 text-amber-500" />
          <span className="text-xs font-bold text-amber-700">
            {summary?.onLeaveToday || 0} On Leave
          </span>
        </div>

        {summary?.isWeekOff && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border bg-slate-50 border-slate-200">
            <Sun className="h-3.5 w-3.5 text-slate-500" />
            <span className="text-xs font-bold text-slate-700">
              Week Off
            </span>
          </div>
        )}

        {summary?.isPublicHoliday && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border bg-slate-50 border-slate-200">
            <Calendar className="h-3.5 w-3.5 text-slate-500" />
            <span className="text-xs font-bold text-slate-700">
              {summary.holidayName || "Public Holiday"}
            </span>
          </div>
        )}
      </div>

      <div className="max-w-xs w-full">
        <InputWithIcon
          icon={Search}
          type="text"
          placeholder="Search member..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TeamHeader;
