"use client";

import { Bar, BarChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { format, subDays, startOfDay, endOfDay } from "date-fns";
import { Task } from "@/types";
import { useMemo } from "react";

const chartData = [
  { date: "2024-07-15", created: 450, completed: 300 },
  { date: "2024-07-16", created: 380, completed: 420 },
  { date: "2024-07-17", created: 520, completed: 120 },
  { date: "2024-07-18", created: 140, completed: 550 },
  { date: "2024-07-19", created: 600, completed: 350 },
  { date: "2024-07-20", created: 480, completed: 400 },
];

const chartConfig = {
  created: {
    label: "created",
    color: "hsl(var(--chart-1))",
  },
  completed: {
    label: "completed",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type TasksBarChart2Props = {
  tasks: Task[];
  className?: string;
};

export default function TasksBarChart2({
  tasks,
  className,
}: TasksBarChart2Props) {
  const data = useMemo(() => {
    // Generate date strings for the past 7 days
    const today = new Date();
    const chartData = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(today, 6 - i);
      return {
        date: format(date, "yyyy-MM-dd"),
        created: 0,
        completed: 0,
      };
    });

    // Create a map for O(1) lookups
    const dateMap = new Map(chartData.map((item, index) => [item.date, index]));

    // Process all tasks in a single pass
    tasks.forEach((task) => {
      if (task.created_at) {
        const createdDateStr = format(new Date(task.created_at), "yyyy-MM-dd");
        const index = dateMap.get(createdDateStr);
        if (index !== undefined) {
          chartData[index].created += 1;
        }
      }

      if (task.completed_at) {
        const completedDateStr = format(
          new Date(task.completed_at),
          "yyyy-MM-dd",
        );
        const index = dateMap.get(completedDateStr);
        if (index !== undefined) {
          chartData[index].completed += 1;
        }
      }
    });

    return chartData;
  }, [tasks]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Tooltip - Default</CardTitle>
        <CardDescription>
          Default tooltip with ChartTooltipContent.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  weekday: "short",
                });
              }}
            />
            <Bar
              dataKey="created"
              stackId="a"
              fill="var(--color-created)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="completed"
              stackId="a"
              fill="var(--color-completed)"
              radius={[4, 4, 0, 0]}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
              cursor={false}
              defaultIndex={1}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
