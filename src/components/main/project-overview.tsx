import { useProjectPageContext } from "@/state/context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TODO_COLOR, IN_PROGRESS_COLOR, DONE_COLOR } from "@/constants/colors";
import { ProjectPieChart } from "@/components/shared/project-pie-chart";
import { useMemo } from "react";
import CreateTaskDialog from "@/components/main/create-task-dialog";
import TasksBarChart2 from "@/components/shared/tasks-bar-chart-2";
import TasksBarChart3 from "@/components/shared/tasks-bar-chart-3";

export default function ProjectOverview() {
  const { project } = useProjectPageContext();

  if (!project) {
    return (
      <div className="flex h-64 items-center justify-center">
        Project not found
      </div>
    );
  }

  // Calculate task statistics
  const totalTasks = project.tasks.length;
  const { todoTasks, inProgressTasks, completedTasks } = useMemo(
    () =>
      project.tasks.reduce(
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
    [project.tasks],
  );

  const completionPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Get project color
  const projectColor = project.color || "sky";

  // Prepare data for pie chart
  const statusChartData = [
    { status: "TODO", tasks: todoTasks, fill: `var(--color-TODO)` },
    {
      status: "IN_PROGRESS",
      tasks: inProgressTasks,
      fill: `var(--color-IN_PROGRESS)`,
    },
    { status: "DONE", tasks: completedTasks, fill: `var(--color-DONE)` },
  ];

  const statusChartConfig = {
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

  // Prepare data for priority bar chart
  const priorityChartData = [
    {
      priority: "LOW",
      count: project.tasks.filter((t) => t.priority === "LOW").length,
    },
    {
      priority: "MEDIUM",
      count: project.tasks.filter((t) => t.priority === "MEDIUM").length,
    },
    {
      priority: "HIGH",
      count: project.tasks.filter((t) => t.priority === "HIGH").length,
    },
  ];

  const priorityChartConfig = {
    count: {
      label: "Tasks",
    },
    low: {
      label: "Low",
      color: "hsl(var(--chart-3))",
    },
    medium: {
      label: "Medium",
      color: "hsl(var(--chart-4))",
    },
    high: {
      label: "High",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

  return (
    <div className="space-y-6">
      {/* Project Header */}
      {/* <div>
        <h2 className="mb-2 text-2xl font-semibold">{project.name}</h2>
        {project.summary && (
          <p className="mb-2 text-base font-medium text-muted-foreground">
            {project.summary}
          </p>
        )}
        {project.description && (
          <p className="mb-4 text-sm text-muted-foreground">
            {project.description}
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <ClockIcon className="mr-1.5 h-4 w-4 opacity-70" />
            <span>
              Created {new Date(project.created_at).toLocaleDateString()}
            </span>
          </div>

          {project.due_date && (
            <div className="flex items-center">
              <CalendarIcon className="mr-1.5 h-4 w-4 opacity-70" />
              <span>Due {new Date(project.due_date).toLocaleDateString()}</span>
            </div>
          )}

          <div className="flex items-center">
            <div
              className={`h-3 w-3 rounded-full bg-${projectColor}-500 mr-1.5`}
            ></div>
            <span className="capitalize">{projectColor}</span>
          </div>
        </div>
      </div> */}

      {/* Project Stats */}
      {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <div
                className={`mr-2 h-3 w-3 rounded-full bg-${TODO_COLOR}`}
              ></div>
              To Do
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold`}>{todoTasks}</div>
            <p className="mt-1 text-xs text-muted-foreground">
              {totalTasks > 0
                ? `${Math.round((todoTasks / totalTasks) * 100)}% of all tasks`
                : "No tasks yet"}
            </p>
            {totalTasks > 0 && (
              <Progress
                value={Math.round((todoTasks / totalTasks) * 100)}
                className="mt-2 h-1"
                indicatorColor={`bg-${TODO_COLOR}`}
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <div
                className={`mr-2 h-3 w-3 rounded-full bg-${IN_PROGRESS_COLOR}`}
              ></div>
              In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold`}>{inProgressTasks}</div>
            <p className="mt-1 text-xs text-muted-foreground">
              {totalTasks > 0
                ? `${Math.round((inProgressTasks / totalTasks) * 100)}% of all tasks`
                : "No tasks yet"}
            </p>
            {totalTasks > 0 && (
              <Progress
                value={Math.round((inProgressTasks / totalTasks) * 100)}
                className="mt-2 h-1"
                indicatorColor={`bg-${IN_PROGRESS_COLOR}`}
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <div
                className={`mr-2 h-3 w-3 rounded-full bg-${DONE_COLOR}`}
              ></div>
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold`}>{completedTasks}</div>
            <p className="mt-1 text-xs text-muted-foreground">
              {totalTasks > 0
                ? `${Math.round((completedTasks / totalTasks) * 100)}% of all tasks`
                : "No tasks yet"}
            </p>
            {totalTasks > 0 && (
              <Progress
                value={Math.round((completedTasks / totalTasks) * 100)}
                className="mt-2 h-1"
                indicatorColor={`bg-${DONE_COLOR}`}
              />
            )}
          </CardContent>
        </Card>
      </div> */}
      {project.tasks.length > 0 ? (
        <div className="space-y-6">
          {/* Project Progress */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Project Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Overall Completion
                  </span>
                  <span className="text-sm font-medium">
                    {completionPercentage}%
                  </span>
                </div>
                <Progress
                  value={completionPercentage}
                  indicatorColor="bg-foreground"
                  style={{ opacity: completionPercentage / 100 }}
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Charts Section */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Task Status Distribution - Pie Chart */}
            <ProjectPieChart tasks={project.tasks} />

            {/* Task Priority Distribution - Bar Chart */}
            <TasksBarChart2 tasks={project.tasks} />

            <TasksBarChart3 tasks={project.tasks} className="col-span-2" />
          </div>
        </div>
      ) : (
        <div className="flex h-[250px] items-center justify-center text-muted-foreground">
          <div className="flex flex-col items-center justify-center gap-2">
            <p>Create a task to get started.</p>
            <CreateTaskDialog />
          </div>
        </div>
      )}
    </div>
  );
}
