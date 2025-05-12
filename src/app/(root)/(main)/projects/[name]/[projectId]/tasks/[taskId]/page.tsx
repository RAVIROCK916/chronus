"use client";

import { useEffect, useState } from "react";

import { GET_TASK } from "@/lib/apollo/client/task";
import TaskDetails from "@/components/main/task-details";
import TaskLabelInput from "@/components/shared/task-label-input";
import TaskPrioritySelect from "@/components/shared/task-priority-select";
import TaskStatusSelect from "@/components/shared/task-status-select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import BreadCrumb from "@/components/shared/breadcrumb";
import { Task as TaskType } from "@/types";
import { useQuery } from "@apollo/client";
import { FaRegCircleDot } from "react-icons/fa6";
import { MdPriorityHigh } from "react-icons/md";
import { CiShoppingTag } from "react-icons/ci";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { MdSignalCellular1Bar } from "react-icons/md";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";
import DatePicker from "@/components/shared/date-picker";
import PaddingContainer from "@/components/shared/padding-container";

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

  const { data } = useQuery(GET_TASK, {
    variables: { id: taskId },
  });

  console.log("data", task);

  useEffect(() => {
    if (data?.task) {
      setTask(data.task);
    }
  }, [data]);

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <PaddingContainer className="mx-auto space-y-6">
      {/* <BreadCrumb paths={breadcrumbs} /> */}
      {task && (
        <div className="flex justify-between gap-6">
          <div className="min-w-[600px]">
            <TaskDetails task={task} />
          </div>
          <div className="max-w-72">
            <h3>Details</h3>
            <Separator className="my-3" />
            <div className="space-y-4">
              <div>
                <Label className="text-text-tertiary">Status</Label>
                <TaskStatusSelect id={taskId} taskStatus={task.status} />
              </div>
              <div>
                <Label className="text-text-tertiary">Priority</Label>
                <TaskPrioritySelect id={taskId} taskPriority={task.priority} />
              </div>
              {task.labels && (
                <div>
                  <Label className="text-text-tertiary">Labels</Label>
                  <TaskLabelInput labels={task.labels} onChange={() => {}} />
                </div>
              )}
              <div>
                <Label className="text-text-tertiary">Due Date</Label>
                {task.dueDate ? <DatePicker /> : <DatePicker />}
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
