import { TaskPriority } from "@/types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { UPDATE_TASK_PRIORITY } from "@/lib/apollo/client/task";

type TaskPrioritySelectProps = {
  id: string;
  taskPriority: TaskPriority;
};

export default function TaskPrioritySelect({
  id,
  taskPriority,
}: TaskPrioritySelectProps) {
  const [priority, setPriority] = useState<string>(taskPriority);

  const [updateTaskPriority] = useMutation(UPDATE_TASK_PRIORITY);

  const handleValueChange = (value: string) => {
    console.log("value", value);
    setPriority(value);
    updateTaskPriority({
      variables: { id, priority: value },
    });
  };

  return (
    <Select defaultValue={priority} onValueChange={handleValueChange}>
      <SelectTrigger id={id}>
        <SelectValue placeholder="Select priority" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="LOW">Low</SelectItem>
        <SelectItem value="MEDIUM">Medium</SelectItem>
        <SelectItem value="HIGH">High</SelectItem>
      </SelectContent>
    </Select>
  );
}
