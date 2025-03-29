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
import gql from "graphql-tag";
import { useState } from "react";

type Props = {
  id: string;
  taskStatus: TaskStatus;
};

export default function TaskStatusSelect({ id, taskStatus }: Props) {
  const [status, setStatus] = useState<string>(taskStatus);

  const [updateTaskStatus] = useMutation(UPDATE_TASK_STATUS);

  const handleValueChange = (value: string) => {
    console.log("value", value);
    setStatus(value);
    updateTaskStatus({
      variables: { id, status: value },
    });
  };

  console.log("status", status);

  return (
    <Select defaultValue={status} onValueChange={handleValueChange}>
      <SelectTrigger id={id}>
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="TODO">To Do</SelectItem>
        <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
        <SelectItem value="DONE">Done</SelectItem>
      </SelectContent>
    </Select>
  );
}
