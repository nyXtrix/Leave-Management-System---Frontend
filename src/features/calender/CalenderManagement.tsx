import React, { useState } from "react";
import { 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval
} from "date-fns";
import { CalendarHeader } from "./components/CalendarHeader";
import { CalendarFilters } from "./components/CalendarFilters";
import { CalendarGrid } from "./components/CalendarGrid";
import { AddHolidayModal } from "./components/AddHolidayModal";
import { MOCK_EVENTS } from "./constants";
import type { CalendarFilterValue } from "./types";

const CalendarManagement = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1)); // Default to April 2026 for demo
  const [activeFilter, setActiveFilter] = useState<CalendarFilterValue>("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToToday = () => setCurrentDate(new Date());

  const handleFilterChange = (val: string | number) => {
    setActiveFilter(val as CalendarFilterValue);
  };

  const handleAddHoliday = (date?: Date) => {
    if (date) {
      setSelectedDate(date);
    } else {
      setSelectedDate(null);
    }
    setIsModalOpen(true);
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] min-h-[600px] bg-white rounded-xl border border-slate-200 shadow-premium overflow-hidden animate-reveal">
      {/* Top Bar (Header + Filters) */}
      <div className="flex flex-col md:flex-row items-center justify-between px-8 py-6 border-b border-slate-100 gap-4 bg-slate-50/50">
        <CalendarHeader 
          currentDate={currentDate} 
          onPrevMonth={prevMonth} 
          onNextMonth={nextMonth} 
          onToday={goToToday} 
        />
        <CalendarFilters 
          activeFilter={activeFilter} 
          onFilterChange={handleFilterChange} 
          onAddHoliday={() => handleAddHoliday()} 
        />
      </div>

      {/* Main Grid */}
      <CalendarGrid 
        days={calendarDays} 
        monthStart={monthStart} 
        events={MOCK_EVENTS} 
        activeFilter={activeFilter} 
        onAddEvent={handleAddHoliday}
      />

      <AddHolidayModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default CalendarManagement;