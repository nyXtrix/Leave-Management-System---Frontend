export type CalendarEventType = "HOLIDAY" | "LEAVE" | "REPORTEE_LEAVE" | "WEEKOFF";

export interface CalendarEvent {
  id: string;
  date: string;
  title: string;
  type: CalendarEventType;
  subType?: string;
  description?: string;
  avatar?: string;
  metadata?: Record<string, string>;
}

export interface CalendarSummary {
  month: string;
  totalHolidays: number;
  totalLeaves: number;
  totalWeekOffs: number;
  workingDays: number;
}

export interface CalendarConfig {
  defaultWeekOffs: number[];
}

export interface CalendarResponse {
  items: CalendarEvent[];
  summary: CalendarSummary;
  config: CalendarConfig;
}

export type CalendarFilterValue = "ALL" | "TEAM" | "REPORTEES" | "HOLIDAY";
