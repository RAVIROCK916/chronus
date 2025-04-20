"use client";

import { ChartPie, TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTasksContext } from "@/state/context";

export function TasksPieChart() {
  const tasks = useTasksContext();
  const chartData = Object.values(
    tasks.reduce(
      (acc, task) => {
        acc[task.status].tasks = acc[task.status].tasks + 1;
        return acc;
      },
      {
        TODO: {
          status: "TODO",
          tasks: 0,
          fill: `var(--color-TODO)`,
        },
        IN_PROGRESS: {
          status: "IN_PROGRESS",
          tasks: 0,
          fill: `var(--color-IN_PROGRESS)`,
        },
        DONE: {
          status: "DONE",
          tasks: 0,
          fill: `var(--color-DONE)`,
        },
      },
    ),
  );

  const chartConfig = {
    tasks: {
      label: "Tasks",
    },
    TODO: {
      label: "Todo",
      color: "hsl(var(--chart-1))",
    },
    IN_PROGRESS: {
      label: "In Progress",
      color: "hsl(var(--chart-3))",
    },
    DONE: {
      label: "Done",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="flex items-center gap-2">
          <ChartPie size={16} /> January - June 2024
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="tasks" nameKey="status" />
            <ChartLegend
              content={<ChartLegendContent nameKey="status" />}
              iconSize={64}
              className="text-sm"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}
