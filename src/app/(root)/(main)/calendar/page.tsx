import CalendarApp from "@/components/main/calendar-app";
import Calendar from "@/components/main/origin-ui-calendar";
import PaddingContainer from "@/components/shared/padding-container";

export default function Page() {
  return (
    <PaddingContainer className="pt-0">
      <div className="flex h-full w-full flex-col justify-center gap-6 pt-2">
        <h1 className="text-4xl font-bold">Calendar</h1>
        {/* <CalendarApp /> */}
        <Calendar />
      </div>
    </PaddingContainer>
  );
}
