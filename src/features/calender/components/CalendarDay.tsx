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
  onEventClick: (event: ICalendarEvent) => void;
  canCreate: boolean;
}

export const CalendarDay: React.FC<CalendarDayProps> = ({
  day,
  isCurrentMonth,
  events,
  idx,
  onAddEvent,
  onEventClick,
  canCreate,
}) => {
  return (
    <div
      className={cn(
        "h-full p-1 sm:p-2 transition-all group/day flex flex-col relative border-r border-b border-secondary-300",
        !isCurrentMonth ? "bg-slate-50/40" : "bg-white hover:bg-slate-50/30"
      )}
    >
      <div className={cn(
        "flex flex-col h-full",
      )}>
        <div className="flex justify-between items-start mb-0.5 sm:mb-1">
          <span
            className={cn(
              "h-5 w-5 sm:h-7 sm:w-7 flex items-center justify-center rounded-md sm:rounded-lg text-[10px] sm:text-sm font-semibold transition-all",
              isToday(day)
                ? "bg-primary-600 text-white shadow-glow-primary"
                : isCurrentMonth
                ? "text-slate-600 group-hover/day:text-primary-600"
                : "text-slate-300"
            )}
          >
            {format(day, "d")}
          </span>

          {isCurrentMonth && canCreate && (
            <button 
              className="h-5 w-5 sm:h-6 sm:w-6 rounded-md sm:rounded-lg bg-white border border-secondary-300 items-center justify-center text-slate-800 opacity-0 group-hover/day:opacity-100 transition-all hover:text-primary-600 hover:border-primary-100 hover:shadow-sm hidden sm:flex"
              onClick={(e) => {
                e.stopPropagation();
                onAddEvent(day);
              }}
            >
              <Plus className="h-3 w-3" />
            </button>
          )}
        </div>

        <div className="flex-1 space-y-0.5 sm:space-y-1 overflow-y-auto no-scrollbar">
          {events.map((event) => (
            <div
              key={event.id}
              onClick={(e) => {
                e.stopPropagation();
                onEventClick(event);
              }}
              className={cn(
                "rounded-md border group/event transition-all hover:scale-[1.02] cursor-pointer shadow-sm",
                "p-0.5 sm:px-1.5 sm:py-1",
                EVENT_COLORS[event.type]
              )}
              title={`${event.title}${event.description ? ': ' + event.description : ''}`}
            >
              <div className="hidden sm:flex items-center gap-1.5">
                {event.avatar ? (
                  <img
                    src={event.avatar}
                    alt=""
                    className="h-3.5 w-3.5 rounded-full border border-white/50"
                  />
                ) : (
                  <div className="h-2 w-2 shrink-0 flex items-center justify-center">
                    <div className="h-1 w-1 rounded-full bg-current" />
                  </div>
                )}
                <span className="truncate flex-1 tracking-tight text-[9px] font-bold">{event.title}</span>
              </div>

              <div className="sm:hidden flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-current" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
