"use client";

import CurrentTimer from "@/components/main/current-timer";
import { TasksAreaChart } from "@/components/shared/tasks-area-chart";
import { TasksBarChart } from "@/components/shared/tasks-bar-chart";
import { TasksPieChart } from "@/components/shared/tasks-pie-chart";
import {
  Card,
  CardContent,
  CardDescription,
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

export default function Page() {
  const { data } = useQuery(GET_DASHBOARD_QUERY);

  if (!data) return null;
  console.log(data);
  const tasks: Task[] = data.projects
    .map((project: Project) => project.tasks)
    .flat();

  let tasksCompleted = 0;
  let currentStreak = 0;

  const totalTime = tasks.reduce((acc, task) => {
    if (task.status === "DONE") {
      tasksCompleted += 1;
      currentStreak += 1;
      return (
        acc +
        (Number(task.completed_at) - Number(task.updated_at)) / 60 / 60 / 1000
      );
    } else {
      currentStreak = 0;
      return acc;
    }
  }, 0);

  return (
    <div className="space-y-4 pb-8 pr-4">
      {/* <div className="flex flex-row-reverse">
        <CurrentTimer />
      </div> */}
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
              {Math.floor((tasksCompleted / tasks.length) * 100)}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                <Percent className="inline-block" size={14} />
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <TasksContext.Provider value={tasks}>
          <TasksBarChart />
          <TasksPieChart />
          <TasksAreaChart />
        </TasksContext.Provider>
      </div>
    </div>
  );
}
