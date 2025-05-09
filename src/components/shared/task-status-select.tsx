"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UPDATE_TASK_STATUS } from "@/lib/apollo/client/task";
import { TaskStatus } from "@/types";
import { useMutation } from "@apollo/client";
import { useState } from "react";

type TaskStatusSelectProps = {
  id?: string;
  taskStatus: string;
  onChange?: (status: string) => void;
};

function StatusDot({ className }: { className?: string }) {
  return (
    <svg
      width="8"
      height="8"
      fill="currentColor"
      viewBox="0 0 8 8"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="4" cy="4" r="4" />
    </svg>
  );
}

export default function TaskStatusSelect({
  id,
  taskStatus,
  onChange,
}: TaskStatusSelectProps) {
  const [status, setStatus] = useState<string>(taskStatus);

  const [updateTaskStatus] = useMutation(UPDATE_TASK_STATUS);

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    if (id) {
      updateTaskStatus({
        variables: {
          id,
          status: newStatus,
        },
      });
    }

    // Call the onChange prop if provided
    onChange?.(newStatus);
  };

  return (
    <Select defaultValue={status} onValueChange={handleStatusChange}>
      <SelectTrigger id={id}>
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="TODO">
          <span className="flex items-center gap-2">
            <StatusDot className="text-amber-400" />
            <span className="truncate">To Do</span>
          </span>
        </SelectItem>
        <SelectItem value="IN_PROGRESS">
          <span className="flex items-center gap-2">
            <StatusDot className="text-sky-400" />
            <span className="truncate">In Progress</span>
          </span>
        </SelectItem>
        <SelectItem value="DONE">
          <span className="flex items-center gap-2">
            <StatusDot className="text-emerald-400" />
            <span className="truncate">Done</span>
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
