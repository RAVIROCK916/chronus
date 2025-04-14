"use client";

import { TrendingUp } from "lucide-react";
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
import { subMonths } from "date-fns";
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-3))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function TasksBarChart() {
  const tasks = useTasksContext();
  // const last7Months = Array.from({ length: 7 }).map((_, i) => {
  //   const date = subMonths(new Date(), 6 - i);
  //   // date.setMonth(date.getMonth() - i);
  //   return {
  //     label: date.toLocaleString("default", { month: "short" }), // e.g., Jan, Feb
  //     desktop: 0,
  //     mobile: 0,
  //   };
  // });

  const last7Months = Object.values(
    tasks.reduce(
      (acc, task) => {
        const createdDate = new Date(Number(task.created_at));
        const month = createdDate.toLocaleString("default", { month: "short" });
        if (!acc[month]) {
          acc[month] = {
            label: month,
            desktop: 0,
            mobile: 0,
          };
        }
        acc[month].desktop += 1;
        if (task.status === "DONE") {
          acc[month].mobile += 1;
        }
        return acc;
      },
      {} as Record<string, { label: string; desktop: number; mobile: number }>,
    ),
  );

  console.log("last7Months", last7Months);

  // Count tasks created and completed
  for (const task of tasks) {
    const createdDate = new Date(Number(task.created_at));

    for (const month of last7Months) {
      if (
        createdDate.toLocaleString("default", { month: "short" }) ===
        month.label.slice(0, 3)
      ) {
        month.desktop += 1;
        if (task.status === "DONE") {
          month.mobile += 1;
        }
      }
    }
  }

  // Convert to chart format
  const chartData = last7Months.map((month) => ({
    month: month.label,
    desktop: month.desktop,
    mobile: month.mobile,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Multiple</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
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
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
