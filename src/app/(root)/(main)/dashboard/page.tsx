"use client";

import PaddingContainer from "@/components/shared/padding-container";
import { TasksAreaChart } from "@/components/shared/tasks-area-chart";
import { TasksBarChart } from "@/components/shared/tasks-bar-chart";
import { TasksPieChart } from "@/components/shared/tasks-pie-chart";
import { Heatmap } from "@/components/main/heat-map";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GET_DASHBOARD_QUERY } from "@/lib/apollo/client/dashboard";
import { TasksContext } from "@/state/context";
import { Project, Task } from "@/types";
import { useQuery } from "@apollo/client";
import {
  ChartNoAxesCombined,
  ClipboardCheck,
  Clock3,
  Percent,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  const { data, loading } = useQuery(GET_DASHBOARD_QUERY);

  if (!data) return null;
  const tasks: Task[] = data.projects
    .map((project: Project) => project.tasks)
    .flat();

  let tasksCompleted = 0;

  // Replace the existing streak calculation with this approach
  const calculateCurrentStreak = () => {
    // Create a map of dates when tasks were completed
    const completedDates = new Map<string, boolean>();

    // Add all completed task dates to the map
    tasks.forEach((task) => {
      if (task.status === "DONE" && task.completed_at) {
        const completedDate = new Date(+task.completed_at);
        const dateKey = format(completedDate, "yyyy-MM-dd");
        completedDates.set(dateKey, true);
      }
    });

    // Sort dates to find consecutive days
    const sortedDates = Array.from(completedDates.keys())
      .map((dateStr) => new Date(dateStr))
      .sort((a, b) => b.getTime() - a.getTime()); // Sort descending (newest first)

    console.log("sortedDates", sortedDates);

    if (sortedDates.length === 0) return 0;

    let streak = 0;

    // Check if there's a task completed today
    const today = format(new Date(), "yyyy-MM-dd");
    const hasTaskCompletedToday = completedDates.has(today);

    // If no task completed today, streak is 0
    if (hasTaskCompletedToday) streak++;

    // Count consecutive days
    let currentDate = new Date();

    // Check previous days
    while (true) {
      // Move to previous day
      currentDate.setDate(currentDate.getDate() - 1);
      const dateKey = format(currentDate, "yyyy-MM-dd");

      // If we have a task completed on this day, increase streak
      if (completedDates.has(dateKey)) {
        streak++;
      } else {
        // Break the streak when we find a day with no completed tasks
        break;
      }
    }

    return streak;
  };

  // Use the function to calculate the streak
  const currentStreak = calculateCurrentStreak();

  const totalTime = tasks.reduce((acc, task) => {
    if (task.status === "DONE" && task.completed_at) {
      tasksCompleted += 1;
      return (
        acc +
        (Number(task.completed_at) - Number(task.updated_at)) / 60 / 60 / 1000
      );
    }
    return acc;
  }, 0);

  const heatmapData = tasks.reduce(
    (acc: Record<string, number>, task: Task) => {
      if (!task.completed_at) return acc;
      const date = new Date(Number(task.completed_at));
      const key = format(date, "yyyy-MM-dd");
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {},
  );

  if (loading)
    return (
      <PaddingContainer className="space-y-4">
        {/* Skeleton for the 4 stat cards */}
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="border-none">
              <CardHeader>
                <div className="flex gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="mt-1 h-3 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-10 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Skeleton for the charts */}
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-5 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[180px] w-full" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-4 w-20" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </PaddingContainer>
    );

  return (
    <PaddingContainer className="space-y-4">
      {/* Total Tasks */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-2">
              <ClipboardCheck size={16} strokeWidth={1.5} />
              <span>Tasks</span>
            </CardTitle>
            <CardDescription>Total number of tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold">
              {tasks.length}{" "}
              <span className="text-sm font-normal text-muted-foreground"></span>
            </p>
          </CardContent>
        </Card>
        {/* Time spent */}
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-2">
              <Clock3 size={16} strokeWidth={1.5} />
              <span>Time</span>
            </CardTitle>
            <CardDescription>Total time spent on tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold">
              {Math.floor(totalTime)}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                hrs
              </span>
            </p>
          </CardContent>
        </Card>
        {/* Tasks Streak */}
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-2">
              <ChartNoAxesCombined size={16} strokeWidth={1.5} />
              <span>Streak</span>
            </CardTitle>
            <CardDescription>Tasks completed in a row</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold">
              {currentStreak}{" "}
              <span className="text-sm font-normal text-muted-foreground"></span>
            </p>
          </CardContent>
        </Card>
        {/* Task completion percentage */}
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-2">
              <Percent size={16} strokeWidth={1.5} />
              <span>Percentage</span>
            </CardTitle>
            <CardDescription>Overall completed tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold">
              {tasks.length
                ? Math.floor((tasksCompleted / tasks.length) * 100)
                : 0}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                <Percent className="inline-block" size={14} />
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
      {tasks.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          <TasksContext.Provider value={tasks}>
            <TasksBarChart />
            <TasksPieChart />
            <TasksAreaChart />
            <Heatmap data={heatmapData} />
          </TasksContext.Provider>
        </div>
      ) : (
        <div className="flex h-48 items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-2">
            <h3 className="text-2xl font-bold">No tasks yet!</h3>
            <p className="text-sm text-muted-foreground">
              Let&apos;s get started by creating a new project.
            </p>
            <Button>
              <Link href="/projects">Go to Projects</Link>
            </Button>
          </div>
        </div>
      )}
    </PaddingContainer>
  );
}
