"use client";

import TaskDetails from "@/components/main/task-details";
import TaskLabelInput from "@/components/shared/task-label-input";
import TaskPrioritySelect from "@/components/shared/task-priority-select";
import TaskStatusSelect from "@/components/shared/task-status-select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Task as TaskType } from "@/types";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

type TaskPageProps = {
  params: { projectId: string; taskId: string };
};

export default function TaskPage({ params }: TaskPageProps) {
  const { projectId, taskId } = params;

  const [task, setTask] = useState<TaskType | null>(null);

  const GET_TASK = gql`
    query getTask($id: ID!) {
      task(id: $id) {
        id
        title
        description
        status
        priority
      }
    }
  `;

  const { data } = useQuery(GET_TASK, {
    variables: { id: taskId },
  });

  console.log("data", task);

  useEffect(() => {
    if (data?.task) {
      setTask(data.task);
    }
  }, [data]);

  return (
    <div className="space-y-4 pr-4">
      <h2 className="text-4xl">Task</h2>
      {task && (
        <div className="flex gap-6">
          <div className="min-w-[800px]">
            <TaskDetails task={task} />
          </div>
          <div className="w-60 min-w-64">
            <h3 className="text-text-tertiary">Details</h3>
            <Separator className="my-3" />
            <div className="space-y-4">
              <div>
                <Label>Status</Label>
                <TaskStatusSelect id={taskId} taskStatus={task.status} />
              </div>
              <div>
                <Label>Priority</Label>
                <TaskPrioritySelect id={taskId} taskPriority={task.priority} />
              </div>
              <div>
                <TaskLabelInput taskId={taskId} taskLabels={task.labels} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
