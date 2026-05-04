import React from "react";
import { isSameMonth, isSameDay } from "date-fns";
import { CalendarDay } from "./CalendarDay";
import type { CalendarEvent, CalendarFilterValue } from "../types";
import { WEEK_DAYS } from "../constants";

interface CalendarGridProps {
  days: Date[];
  monthStart: Date;
  events: CalendarEvent[];
  activeFilter: CalendarFilterValue;
  onAddEvent: (date: Date) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  days,
  monthStart,
  events,
  activeFilter,
  onAddEvent,
}) => {
  const getEventsForDay = (day: Date) => {
    return events
      .filter((event) => isSameDay(event.date, day))
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
      <div className="grid grid-cols-7 border-b border-secondary-300 bg-white sticky top-0 z-20">
        {WEEK_DAYS.map((day) => (
          <div key={day} className="py-4 text-center">
            <span className="text-sm font-bold text-primary-500">
              {day}
            </span>
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar grid grid-cols-7 border-slate-100">
        {days.map((day, idx) => (
          <CalendarDay
            key={day.toString()}
            day={day}
            isCurrentMonth={isSameMonth(day, monthStart)}
            events={getEventsForDay(day)}
            idx={idx}
            onAddEvent={onAddEvent}
          />
        ))}
      </div>
    </div>
  );
};
