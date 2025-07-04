"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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
import { Task } from "@/types";

const chartConfig = {
  tasks: {
    label: "tasks",
  },
  done: {
    label: "Done",
    color: "hsl(var(--chart-1))",
  },
  in_progress: {
    label: "In Progress",
    color: "hsl(var(--chart-3))",
  },
  todo: {
    label: "To Do",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

type ProjectPieChartProps = {
  tasks: Task[];
};

export function ProjectPieChart({ tasks }: ProjectPieChartProps) {
  const { todoTasks, inProgressTasks, completedTasks } = React.useMemo(
    () =>
      tasks.reduce(
        (acc, curr) => {
          if (curr.status === "TODO") {
            acc.todoTasks++;
          } else if (curr.status === "IN_PROGRESS") {
            acc.inProgressTasks++;
          } else if (curr.status === "DONE") {
            acc.completedTasks++;
          }
          return acc;
        },
        {
          todoTasks: 0,
          inProgressTasks: 0,
          completedTasks: 0,
        },
      ),
    [tasks],
  );
  const chartData = [
    { status: "done", tasks: completedTasks, fill: "var(--color-done)" },
    {
      status: "in_progress",
      tasks: inProgressTasks,
      fill: "var(--color-in_progress)",
    },
    { status: "todo", tasks: todoTasks, fill: "var(--color-todo)" },
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut with Text</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {tasks.length > 0 ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="tasks"
                nameKey="status"
                innerRadius={55}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {tasks.length.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            tasks
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey="status" />}
                iconSize={64}
                className="text-sm"
              />
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="flex h-[250px] items-center justify-center text-muted-foreground">
            No tasks available to display
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {/* <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="leading-none text-muted-foreground">
          Showing total tasks for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
