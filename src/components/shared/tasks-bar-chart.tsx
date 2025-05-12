"use client";

import { ChartColumnBig, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTasksContext } from "@/state/context";

const chartConfig = {
  todo: {
    label: "To Do",
    color: "hsl(var(--chart-1))",
  },
  done: {
    label: "Done",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function TasksBarChart() {
  const tasks = useTasksContext();

  const last7Months = Object.values(
    tasks.reduce(
      (acc, task) => {
        const createdDate = new Date(Number(task.created_at));
        const month = createdDate.toLocaleString("default", { month: "short" });
        if (!acc[month]) {
          acc[month] = {
            label: month,
            todo: 0,
            done: 0,
          };
        }
        acc[month].todo += 1;
        if (task.status === "DONE") {
          acc[month].done += 1;
        }
        return acc;
      },
      {} as Record<string, { label: string; todo: number; done: number }>,
    ),
  );

  // Convert to chart format
  const chartData = last7Months.map((month) => ({
    month: month.label,
    todo: month.todo,
    done: month.done,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChartColumnBig size={16} />
          Bar Chart - Multiple
        </CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="todo" fill="var(--color-todo)" radius={4} />
            <Bar dataKey="done" fill="var(--color-done)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}
