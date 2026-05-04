export type CalendarEventType = "HOLIDAY" | "LEAVE" | "REPORTEE_LEAVE";

export interface CalendarEvent {
  id: string;
  date: Date;
  title: string;
  type: CalendarEventType;
  subType?: string;
  description?: string;
  avatar?: string;
}

export interface CalendarFilters {
  holidays: boolean;
  team: boolean;
  reportees: boolean;
}

export type CalendarFilterValue = "ALL" | "TEAM" | "REPORTEES" | "HOLIDAY";
