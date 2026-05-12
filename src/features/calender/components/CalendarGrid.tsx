import React from "react";
import { isSameMonth, isSameDay } from "date-fns";
import { CalendarDay } from "./CalendarDay";
import type { CalendarEvent, CalendarFilterValue } from "../types";
import { WEEK_DAYS } from "../constants";
import { cn } from "@/lib/utils";

interface CalendarGridProps {
  days: Date[];
  monthStart: Date;
  events: CalendarEvent[];
  activeFilter: CalendarFilterValue;
  onAddEvent: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
  canCreate: boolean;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  days,
  monthStart,
  events,
  activeFilter,
  onAddEvent,
  onEventClick,
  canCreate,
}) => {
  const getEventsForDay = (day: Date) => {
    return events
      .filter((event) => isSameDay(new Date(event.date), day))
      .filter((event) => {
        if (activeFilter === "ALL") return true;
        if (activeFilter === "HOLIDAY") return event.type === "HOLIDAY";
        if (activeFilter === "TEAM") return event.type === "LEAVE";
        if (activeFilter === "REPORTEES") return event.type === "REPORTEE_LEAVE";
        return true;
      });
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="grid grid-cols-7 border-b border-secondary-200 bg-white">
        {WEEK_DAYS.map((day) => (
          <div key={day} className="py-2 sm:py-3 text-center">
            <span className="text-[10px] sm:text-xs font-semibold text-secondary-400 uppercase tracking-tighter sm:tracking-widest">
              <span className="sm:hidden">{day.charAt(0)}</span>
              <span className="hidden sm:inline">{day}</span>
            </span>
          </div>
        ))}
      </div>

      <div 
        className={cn(
          "flex-1 grid grid-cols-7",
          days.length > 35 ? "grid-rows-6" : "grid-rows-5"
        )}
      >
        {days.map((day, idx) => (
          <CalendarDay
            key={day.toString()}
            day={day}
            isCurrentMonth={isSameMonth(day, monthStart)}
            events={getEventsForDay(day)}
            idx={idx}
            onAddEvent={onAddEvent}
            onEventClick={onEventClick}
            canCreate={canCreate}
          />
        ))}
      </div>
    </div>
  );
};
