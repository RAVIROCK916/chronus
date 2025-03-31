"use client";

// Component exports
export { AgendaView } from "./shared/agenda-view";
export { DayView } from "./shared/day-view";
export { DraggableEvent } from "./shared/draggable-event";
export { DroppableCell } from "./shared/droppable-cell";
export { EventDialog } from "./shared/event-dialog";
export { EventItem } from "./shared/event-item";
export { EventsPopup } from "./shared/events-popup";
export { EventCalendar } from "./main/event-calendar";
export { MonthView } from "./shared/month-view";
export { WeekView } from "./shared/week-view";
export {
  CalendarDndProvider,
  useCalendarDnd,
} from "./shared/calendar-dnd-context";

// Constants and utility exports
export * from "./constants";
export * from "./utils";

// Hook exports
export * from "@/hooks/use-current-time-indicator";
export * from "@/hooks/use-event-visibility";

// Type exports
export type { CalendarEvent, CalendarView, EventColor } from "./types";
