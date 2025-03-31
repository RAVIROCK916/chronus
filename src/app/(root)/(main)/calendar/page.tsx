import CalendarApp from "@/components/main/calendar-app";
import Calendar from "@/components/main/origin-ui-calendar";

export default function Page() {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-8 py-3 pr-6">
      <h1 className="text-4xl font-bold">Calendar</h1>
      {/* <CalendarApp /> */}
      <Calendar />
    </div>
  );
}
