import React from "react";
import { Plus, Filter } from "lucide-react";
import SelectInput from "@/components/common/inputs/SelectInput";
import type { CalendarFilterValue } from "../types";
import IconButton from "@/components/ui/IconButton";
import { CALENDER_EVENT_FILTER } from "@/constant";

interface CalendarFiltersProps {
  activeFilter: CalendarFilterValue;
  onFilterChange: (val: string | number) => void;
  onAddHoliday: () => void;
  canCreate: boolean;
}

export const CalendarFilters: React.FC<CalendarFiltersProps> = ({
  activeFilter,
  onFilterChange,
  onAddHoliday,
  canCreate,
}) => {
  return (
    <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
      <div className="flex-1 sm:w-[200px]">
        <SelectInput
          options={CALENDER_EVENT_FILTER}
          value={activeFilter}
          onChange={onFilterChange}
          placeholder="Filter"
          icon={Filter}
          className="rounded-xl border-slate-200 h-9 sm:h-11 text-xs sm:text-sm"
        />
      </div>

      {canCreate && (
        <IconButton
          icon={Plus}
          variant="default"
          onClick={onAddHoliday}
          className="h-9 sm:h-11 px-3 sm:px-6 shrink-0"
        >
          <span className="hidden sm:inline">Add Holiday</span>
        </IconButton>
      )}
    </div>
  );
};
