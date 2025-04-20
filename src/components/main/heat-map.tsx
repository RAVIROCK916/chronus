// components/Heatmap.tsx
import { eachDayOfInterval, endOfToday, format, startOfYear } from "date-fns";
import { cn } from "@/lib/utils"; // ShadCN's utility for conditional classes
import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CalendarCheck } from "lucide-react";

type HeatmapProps = {
  data: Record<string, number>; // format: { "2025-04-01": 3 }
};

const colorScale = [
  "bg-muted", // 0
  "bg-neutral-600",
  "bg-neutral-500",
  "bg-neutral-300",
  "bg-neutral-200",
  "bg-neutral-100",
  "bg-neutral-50",
];

const getColorClass = (highest: number, count: number) => {
  if (highest === 0) return colorScale[0];
  if (highest <= 3) return colorScale[count];
  const index = Math.floor((count / highest) * (colorScale.length - 1));
  return colorScale[index] || "bg-muted";
};

export function Heatmap({ data }: HeatmapProps) {
  const start = startOfYear(new Date());
  const end = endOfToday();
  const days = eachDayOfInterval({ start, end });

  const highest = Object.values(data).reduce(
    (max, count) => Math.max(max, count),
    0,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2">
          <CalendarCheck size={16} strokeWidth={1.5} />
          <span>Heatmap</span>
        </CardTitle>
        <CardDescription>Tasks completed per day</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <div className="grid grid-flow-col grid-rows-7 text-xs text-muted-foreground">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          <TooltipProvider>
            <div className="grid grid-flow-col grid-cols-[repeat(53,minmax(0,1fr))] grid-rows-7 gap-x-5 gap-y-1">
              {days.map((day) => {
                const key = format(day, "yyyy-MM-dd");
                const count = data[key] || 0;
                return (
                  <Tooltip key={key}>
                    <TooltipTrigger asChild>
                      <div
                        className={cn(
                          "size-4 rounded-sm",
                          getColorClass(highest, count),
                        )}
                      />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-neutral-200">
                      <p>
                        <span className="font-bold">{count}</span>{" "}
                        {count === 1 ? "task" : "tasks"} on{" "}
                        {format(day, "dd MMM, yyyy")}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
}
