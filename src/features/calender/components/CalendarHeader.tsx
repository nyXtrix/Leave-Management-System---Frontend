import React from "react";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onToday,
}) => {
  return (
    <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-start">
      <div className="flex flex-col">
        <h3 className="text-lg sm:text-xl font-bold text-secondary-900 tracking-tight capitalize whitespace-nowrap">
          {format(currentDate, "MMMM")}{" "}
          <span className="text-primary-600">{format(currentDate, "yyyy")}</span>
        </h3>
      </div>

      <div className="flex items-center bg-white rounded-xl border border-secondary-200 p-0.5 sm:p-1">
        <IconButton
          variant="ghost"
          size="xs"
          className="rounded-lg sm:rounded-xl h-8 w-8 sm:h-9 sm:w-9"
          onClick={onPrevMonth}
          icon={ChevronLeft}
        />
        <div className="w-px h-4 sm:h-6 bg-slate-100 mx-0.5 sm:mx-1" />
        <Button
          variant="ghost"
          size="xs"
          className="h-8 sm:h-10 px-2 sm:px-4 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold"
          onClick={onToday}
        >
          Today
        </Button>
        <div className="w-px h-4 sm:h-6 bg-slate-100 mx-0.5 sm:mx-1" />
        <IconButton
          variant="ghost"
          size="xs"
          className="rounded-lg sm:rounded-xl h-8 w-8 sm:h-9 sm:w-9"
          onClick={onNextMonth}
          icon={ChevronRight}
        />
      </div>
    </div>
  );
};
