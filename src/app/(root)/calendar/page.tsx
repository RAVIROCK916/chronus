import CalendarApp from "@/components/main/calendar-app";

export default function Page() {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-4 py-6">
      <h1 className="text-4xl font-bold">Calendar</h1>
      <CalendarApp />
    </div>
  );
}
