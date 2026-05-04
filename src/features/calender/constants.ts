import type { CalendarEvent } from "./types";

export const MOCK_EVENTS: CalendarEvent[] = [
  { id: "1", date: new Date(2026, 3, 14), title: "Tamil New Year", type: "HOLIDAY", description: "Public Holiday" },
  { id: "2", date: new Date(2026, 3, 15), title: "Sarah Lee", type: "LEAVE", subType: "ANNUAL", avatar: "https://ui-avatars.com/api/?name=Sarah+Lee&background=f472b6&color=fff" },
  { id: "3", date: new Date(2026, 3, 15), title: "Mark Woods", type: "LEAVE", subType: "SICK", avatar: "https://ui-avatars.com/api/?name=Mark+Woods&background=38bdf8&color=fff" },
  { id: "4", date: new Date(2026, 3, 22), title: "Company Retreat", type: "HOLIDAY", description: "Off-site event" },
  { id: "5", date: new Date(2026, 3, 25), title: "John Doe", type: "REPORTEE_LEAVE", subType: "ANNUAL", avatar: "https://ui-avatars.com/api/?name=John+Doe&background=a78bfa&color=fff" },
];

export const EVENT_COLORS: Record<string, string> = {
  HOLIDAY: "bg-amber-100 text-amber-700 border-amber-200",
  LEAVE: "bg-indigo-50 text-indigo-700 border-indigo-100",
  REPORTEE_LEAVE: "bg-emerald-50 text-emerald-700 border-emerald-100",
};

export const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
