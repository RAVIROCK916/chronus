import CalendarApp from "@/components/main/calendar-app";

export default function Page() {
  return (
    <div className="my-6 flex h-full w-full flex-col justify-center gap-4">
      <h1 className="text-4xl font-bold">Calendar</h1>
      <CalendarApp />
    </div>
  );
}
