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
    <div className="flex items-center gap-6">
      <div className="flex flex-col">
        <h3 className="text-xl font-bold text-secondary-900 tracking-tight capitalize">
          {format(currentDate, "MMMM")}{" "}
          <span className="text-primary-600">{format(currentDate, "yyyy")}</span>
        </h3>
      </div>

      <div className="flex items-center bg-white rounded-xl border border-secondary-200 p-1">
        <IconButton
          variant="ghost"
          size="xs"
          className="rounded-xl"
          onClick={onPrevMonth}
          icon={ChevronLeft}
        />
        <div className="w-px h-6 bg-slate-100 mx-1" />
        <Button
          variant="ghost"
          size="xs"
          className="h-10 w-10 rounded-xl text-xs font-bold"
          onClick={onToday}
        >
          Today
        </Button>
        <div className="w-px h-6 bg-slate-100 mx-1" />
        <IconButton
          variant="ghost"
          size="xs"
          className="rounded-xl"
          onClick={onNextMonth}
          icon={ChevronRight}
        />
      </div>
    </div>
  );
};
