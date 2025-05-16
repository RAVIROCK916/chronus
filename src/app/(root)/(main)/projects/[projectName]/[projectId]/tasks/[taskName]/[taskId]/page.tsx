"use client";

import { useEffect, useState } from "react";

import {
  GET_TASK,
  UPDATE_TASK_PRIORITY,
  UPDATE_TASK_STATUS,
} from "@/lib/apollo/client/task";
import TaskDetails from "@/components/main/task-details";
import TaskLabelInput from "@/components/shared/task-label-input";
import TaskPrioritySelect from "@/components/shared/task-priority-select";
import TaskStatusSelect from "@/components/shared/task-status-select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Task as TaskType } from "@/types";
import { useMutation, useQuery } from "@apollo/client";
import DatePicker from "@/components/shared/date-picker";
import PaddingContainer from "@/components/shared/padding-container";
import { Skeleton } from "@/components/ui/skeleton";

type TaskPageProps = {
  params: { projectId: string; taskId: string };
};

export default function TaskPage({ params }: TaskPageProps) {
  const { projectId, taskId } = params;

  const [task, setTask] = useState<TaskType | null>(null);

  const breadcrumbs = [
    { name: "projects", url: "/projects" },
    {
      name: task?.project?.name || "Project",
      url: `/projects/${task?.project?.name}/${projectId}`,
    },
    {
      name: task?.title || "Task",
      url: `/projects/${projectId}/tasks/${taskId}`,
    },
  ];

  const { data, loading } = useQuery(GET_TASK, {
    variables: { id: taskId },
  });

  const [updateTaskStatus] = useMutation(UPDATE_TASK_STATUS);
  const [updateTaskPriority] = useMutation(UPDATE_TASK_PRIORITY);

  console.log("data", task);

  useEffect(() => {
    if (data?.task) {
      setTask(data.task);
    }
  }, [data]);

  function handleStatusChange(newStatus: string) {
    updateTaskStatus({
      variables: {
        id: taskId,
        status: newStatus,
      },
    });
  }

  function handlePriorityChange(newPriority: string) {
    updateTaskPriority({
      variables: {
        id: taskId,
        priority: newPriority,
      },
    });
  }

  if (loading) {
    return <TaskPageSkeleton />;
  }

  if (!task) {
    return (
      <div className="flex h-screen items-center justify-center">
        There is no such task with this id.
      </div>
    );
  }

  return (
    <PaddingContainer className="mx-auto space-y-6">
      {/* <BreadCrumb paths={breadcrumbs} /> */}
      {task && (
        <div className="flex justify-between gap-10">
          <div className="flex-1">
            <TaskDetails task={task} />
          </div>
          <div className="max-w-72">
            <h3>Details</h3>
            <Separator className="my-3" />
            <div className="space-y-4">
              <div>
                <Label className="text-text-tertiary">Status</Label>
                <TaskStatusSelect
                  id={taskId}
                  value={task.status}
                  onChange={handleStatusChange}
                />
              </div>
              <div>
                <Label className="text-text-tertiary">Priority</Label>
                <TaskPrioritySelect
                  id={taskId}
                  value={task.priority}
                  onChange={handlePriorityChange}
                />
              </div>
              {task.labels && (
                <div>
                  <Label className="text-text-tertiary">Labels</Label>
                  <TaskLabelInput labels={task.labels} onChange={() => {}} />
                </div>
              )}
              <div>
                <Label className="text-text-tertiary">Due Date</Label>
                {task.due_date ? <DatePicker /> : <DatePicker />}
              </div>
            </div>
            {/* <table className="[&_td]:pl-12 [&_th]:py-2 [&_th]:text-left [&_th]:font-normal [&_th]:text-text-muted [&_tr]:text-sm">
              <tr>
                <th className="flex items-center gap-2">
                  <FaRegCircleDot />
                  Status
                </th>
                <td>Status</td>
              </tr>
              <tr>
                <th className="flex items-center gap-2">
                  <MdPriorityHigh />
                  Priority
                </th>
                <td>Priority</td>
              </tr>
              <tr>
                <th className="flex items-center gap-2">
                  <Clock size={16} /> Due Date
                </th>
                <td>Due Date</td>
              </tr>
              <tr>
                <th className="flex items-center gap-2">
                  <CiShoppingTag className="stroke-1" size={16} />
                  Tags
                </th>
                <td>
                  <div className="flex flex-wrap gap-2">
                    {task?.labels?.map((label) => (
                      <Badge key={label} variant="secondary">
                        {label}
                      </Badge>
                    ))}
                  </div>
                </td>
              </tr>
            </table> */}
          </div>
        </div>
      )}
    </PaddingContainer>
  );
}

function TaskPageSkeleton() {
  return (
    <PaddingContainer className="mx-auto space-y-6">
      <div className="flex justify-between gap-10">
        {/* Task details skeleton - left side */}
        <div className="flex-1 space-y-6">
          {/* Task title */}
          <Skeleton className="h-8 w-40" />

          {/* Task description */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>

          {/* Comments section */}
          <div className="space-y-4 pt-6">
            <Skeleton className="h-6 w-32" />
            <Separator />

            {/* Comment input */}
            <Skeleton className="h-24 w-full rounded-md" />

            {/* Comments list */}
            <div className="space-y-6 pt-4">
              {Array(3)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div>
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="mt-1 h-3 w-24" />
                      </div>
                    </div>
                    <div className="pl-10">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="mt-1 h-4 w-5/6" />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Task details sidebar - right side */}
        <div className="w-72">
          <Skeleton className="h-6 w-20" />
          <Separator className="my-3" />
          <div className="space-y-4">
            {/* Status */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-16 rounded-md" />
              <Skeleton className="h-9 w-full rounded-md" />
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-16 rounded-md" />
              <Skeleton className="h-9 w-full rounded-md" />
            </div>

            {/* Labels */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-16 rounded-md" />
              <Skeleton className="h-9 w-full rounded-md" />
            </div>

            {/* Due Date */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-16 rounded-md" />
              <Skeleton className="h-9 w-full rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </PaddingContainer>
  );
}
