import React from "react";
import { format, isToday } from "date-fns";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CalendarEvent as ICalendarEvent } from "../types";
import { EVENT_COLORS } from "../constants";

interface CalendarDayProps {
  day: Date;
  isCurrentMonth: boolean;
  events: ICalendarEvent[];
  idx: number;
  onAddEvent: (date: Date) => void;
}

export const CalendarDay: React.FC<CalendarDayProps> = ({
  day,
  isCurrentMonth,
  events,
  idx,
  onAddEvent,
}) => {
  return (
    <div
      className={cn(
        "min-h-[120px] p-2 border-r border-b border-slate-50 transition-colors group/day",
        !isCurrentMonth ? "bg-slate-50/30" : "bg-white hover:bg-slate-50/50",
        (idx + 1) % 7 === 0 && "border-r-0"
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <span
          className={cn(
            "h-8 w-8 flex items-center justify-center rounded-xl text-sm font-black transition-all",
            isToday(day)
              ? "bg-primary-600 text-white shadow-glow-primary scale-110"
              : isCurrentMonth
              ? "text-slate-900 group-hover/day:text-primary-600"
              : "text-slate-300"
          )}
        >
          {format(day, "d")}
        </span>

        {isCurrentMonth && (
          <button 
            className="h-6 w-6 rounded-lg bg-slate-50 border border-slate-100 items-center justify-center text-slate-400 opacity-0 group-hover/day:opacity-100 transition-opacity hover:text-primary-600 hover:bg-white flex"
            onClick={(e) => {
              e.stopPropagation();
              onAddEvent(day);
            }}
          >
            <Plus className="h-3 w-3" />
          </button>
        )}
      </div>

      <div className="space-y-1.5 flex flex-col overflow-hidden pb-2">
        {events.map((event) => (
          <div
            key={event.id}
            className={cn(
              "px-2 py-1.5 rounded-lg border text-[10px] font-bold flex items-center gap-2 group/event transition-all hover:scale-[1.02] cursor-pointer",
              EVENT_COLORS[event.type]
            )}
          >
            {event.avatar ? (
              <img
                src={event.avatar}
                alt=""
                className="h-4 w-4 rounded-full border border-white/50"
              />
            ) : (
              <div className="h-3 w-3 shrink-0 flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-current" />
              </div>
            )}
            <span className="truncate flex-1">{event.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
