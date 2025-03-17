"use client";

import { useNextCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import { createResizePlugin } from "@schedule-x/resize";
import { createEventModalPlugin } from "@schedule-x/event-modal";

import "@schedule-x/theme-default/dist/index.css";
import { useRef, useState } from "react";
import CreateEventModal from "./create-event-modal";
import { Button } from "../ui/button";

function CalendarApp() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);

  const createEventModalRef = useRef(null);

  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Event 1",
      start: "2025-03-13 10:00",
      end: "2025-03-13 11:00",
    },
    {
      id: "2",
      title: "Event 2",
      start: "2025-03-17 00:00",
      end: "2025-03-17 01:00",
    },
  ]);

  const selectedDate = useRef("2025-03-13");

  const eventsService = useState(() => createEventsServicePlugin())[0];

  const calendar = useNextCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: events,
    plugins: [
      eventsService,
      createDragAndDropPlugin(),
      createResizePlugin(),
      createEventModalPlugin(),
    ],
    callbacks: {
      onRender: () => {
        // get all events
        eventsService.getAll();
      },
      onEventClick(event, e) {
        e.stopPropagation();
        console.log(event);
        // setCurrentEvent(event);
        setIsEventModalOpen(true);
      },
      onClickDate: (date) => {
        console.log(date);
        selectedDate.current = date;
      },
      onDoubleClickDate: (date) => {
        console.log(date);
      },
    },
    isDark: true,
  });

  return (
    <div className="space-y-4 pr-4">
      <div className="flex items-center justify-end">
        <Button onClick={() => setIsCreateEventModalOpen(true)}>
          Add Event
        </Button>
      </div>
      <CreateEventModal
        isCreateEventModalOpen={isCreateEventModalOpen}
        setIsCreateEventModalOpen={setIsCreateEventModalOpen}
      />
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

export default CalendarApp;
