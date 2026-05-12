import BaseRequestProvider from "../lib/api/BaseRequestProvider";
import type { CalendarResponse, CalendarFilterValue } from "../features/calender/types";

export interface CalendarQueryParams {
  year: number;
  month: number;
  filter?: CalendarFilterValue;
}

export const calendarService = {
  getCalendar: (params: CalendarQueryParams) => {
    return BaseRequestProvider.get<CalendarResponse>("/Calendar", {
      year: String(params.year),
      month: String(params.month),
      filter: params.filter || "ALL"
    });
  },

  createHoliday: (data: { name: string; date: string }) => {
    return BaseRequestProvider.post("/Calendar/holidays", data);
  },

  updateHoliday: (id: string, data: { name: string; date: string }) => {
    return BaseRequestProvider.put(`/Calendar/holidays/${id}`, data);
  },

  deleteHoliday: (id: string) => {
    return BaseRequestProvider.delete(`/Calendar/holidays/${id}`);
  }
};
