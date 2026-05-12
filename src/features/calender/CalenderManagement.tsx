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
import { calendarService, type CalendarQueryParams } from "@/services/calendar.service";
import { useQuery } from "@/hooks/useQuery";
import type { CalendarFilterValue, CalendarEvent, CalendarResponse } from "./types";
import { useLoader } from "@/contexts/LoaderContext";
import { useEffect, useMemo } from "react";
import { usePermission } from "@/hooks/usePermission";

const CalendarManagement = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeFilter, setActiveFilter] = useState<CalendarFilterValue>("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const { showLoader, hideLoader } = useLoader();
  const { hasAccess } = usePermission();

  const canCreate = useMemo(() => hasAccess("CALENDAR", "CREATE"), [hasAccess]);
  const canUpdate = useMemo(() => hasAccess("CALENDAR", "UPDATE"), [hasAccess]);
  const canDelete = useMemo(() => hasAccess("CALENDAR", "DELETE"), [hasAccess]);

  const { data, isLoading, refetch } = useQuery<CalendarResponse, [CalendarQueryParams]>(
    calendarService.getCalendar,
    [{
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      filter: activeFilter
    }],
    { showGlobalLoader: false }
  );

  useEffect(() => {
    if (isLoading && !data) {
      showLoader();
    } else {
      hideLoader();
    }
  }, [isLoading, data, showLoader, hideLoader]);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToToday = () => setCurrentDate(new Date());

  const handleFilterChange = (val: string | number) => {
    setActiveFilter(val as CalendarFilterValue);
  };

  const handleAddHoliday = (date?: Date) => {
    if (!canCreate) return;
    setSelectedEvent(null);
    if (date) {
      setSelectedDate(date);
    } else {
      setSelectedDate(null);
    }
    setIsModalOpen(true);
  };

  const handleEventClick = (event: CalendarEvent) => {
    if (event.type === "HOLIDAY" && (canUpdate || canDelete)) {
      setSelectedEvent(event);
      setSelectedDate(new Date(event.date));
      setIsModalOpen(true);
    }
  };

  const handleHolidaySubmit = async (holidayData: { name: string; date: string }, id?: string) => {
    if (id && !canUpdate) return;
    if (!id && !canCreate) return;
    
    if (id) {
      await calendarService.updateHoliday(id, holidayData);
    } else {
      await calendarService.createHoliday(holidayData);
    }
    setIsModalOpen(false);
    refetch();
  };

  const handleHolidayDelete = async (id: string) => {
    if (!canDelete) return;
    await calendarService.deleteHoliday(id);
    setIsModalOpen(false);
    refetch();
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const events = data?.items || [];

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] sm:h-[calc(100vh-200px)] bg-white rounded-xl border border-secondary-300 shadow-premium overflow-hidden animate-reveal">
      <div className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 py-2 sm:py-3 border-b border-secondary-300 gap-3 sm:gap-4 bg-slate-50/50">
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
          canCreate={canCreate}
        />
      </div>

      <CalendarGrid 
        days={calendarDays} 
        monthStart={monthStart} 
        events={events} 
        activeFilter={activeFilter} 
        onAddEvent={handleAddHoliday}
        onEventClick={handleEventClick}
        canCreate={canCreate}
      />

      <AddHolidayModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEvent(null);
        }}
        selectedDate={selectedDate}
        selectedEvent={selectedEvent}
        onSubmit={handleHolidaySubmit}
        onDelete={handleHolidayDelete}
        canUpdate={canUpdate}
        canDelete={canDelete}
      />
    </div>
  );
};

export default CalendarManagement;