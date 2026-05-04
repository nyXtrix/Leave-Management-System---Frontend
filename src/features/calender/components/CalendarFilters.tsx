import React from "react";
import { Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";
import SelectInput from "@/components/common/inputs/SelectInput";
import type { CalendarFilterValue } from "../types";

interface CalendarFiltersProps {
  activeFilter: CalendarFilterValue;
  onFilterChange: (val: string | number) => void;
  onAddHoliday: () => void;
}

const FILTER_OPTIONS = [
  { label: "All Events", value: "ALL" },
  { label: "Team Leaves", value: "TEAM" },
  { label: "My Reportees", value: "REPORTEES" },
  { label: "Organization Holidays", value: "HOLIDAY" },
];

export const CalendarFilters: React.FC<CalendarFiltersProps> = ({
  activeFilter,
  onFilterChange,
  onAddHoliday,
}) => {
  return (
    <div className="flex items-center gap-3 w-full md:w-auto">
      <div className="w-[200px]">
        <SelectInput
          options={FILTER_OPTIONS}
          value={activeFilter}
          onChange={onFilterChange}
          placeholder="Filter view"
          icon={Filter}
          size="sm"
          className="rounded-xl border-slate-200"
        />
      </div>

      <Button
        variant="default"
        className="rounded-2xl h-9 bg-slate-900 border-primary-500/20 shadow-glow-primary gap-2 px-6 shrink-0"
        onClick={onAddHoliday}
      >
        <Plus className="h-4 w-4" />
        <span className="text-xs font-black uppercase tracking-widest">
          Add Holiday
        </span>
      </Button>
    </div>
  );
};
