import { useProjectPageContext } from "@/state/context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CalendarIcon, ClockIcon } from "lucide-react";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { TODO_COLOR, IN_PROGRESS_COLOR, DONE_COLOR } from "@/constants/colors";

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
  const todoTasks = project.tasks.filter(
    (task) => task.status === "TODO",
  ).length;
  const inProgressTasks = project.tasks.filter(
    (task) => task.status === "IN_PROGRESS",
  ).length;
  const completedTasks = project.tasks.filter(
    (task) => task.status === "DONE",
  ).length;

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
      color: "hsl(var(--green-500))",
    },
    medium: {
      label: "Medium",
      color: "hsl(var(--yellow-500))",
    },
    high: {
      label: "High",
      color: "hsl(var(--red-500))",
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
            <div className={`text-3xl font-bold text-${TODO_COLOR}`}>
              {todoTasks}
            </div>
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
            <div className={`text-3xl font-bold text-${IN_PROGRESS_COLOR}`}>
              {inProgressTasks}
            </div>
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
            <div className={`text-3xl font-bold text-${DONE_COLOR}`}>
              {completedTasks}
            </div>
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
      </div>

      {/* Project Progress */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Project Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Completion</span>
              <span className="text-sm font-medium">
                {completionPercentage}%
              </span>
            </div>
            <Progress
              value={completionPercentage}
              indicatorColor={
                completionPercentage <= 25
                  ? "bg-red-500"
                  : completionPercentage <= 75
                    ? "bg-orange-500"
                    : "bg-green-500"
              }
              className="h-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Task Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Task Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {totalTasks > 0 ? (
              <ChartContainer
                config={statusChartConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={statusChartData}
                    dataKey="tasks"
                    nameKey="status"
                  />
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
        </Card>

        {/* Task Priority Distribution - Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Task Priority Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {totalTasks > 0 ? (
              <ChartContainer
                config={priorityChartConfig}
                className="h-[250px] w-full"
              >
                <BarChart
                  accessibilityLayer
                  data={priorityChartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="priority"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Bar
                    dataKey="count"
                    radius={4}
                    // Use CSS custom properties for colors
                    fill="currentColor"
                    className="fill-primary"
                  />
                </BarChart>
              </ChartContainer>
            ) : (
              <div className="flex h-[250px] items-center justify-center text-muted-foreground">
                No tasks available to display
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
