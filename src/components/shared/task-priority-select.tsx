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
import {
  MdSignalCellular1Bar,
  MdSignalCellular2Bar,
  MdSignalCellular3Bar,
} from "react-icons/md";

type TaskPrioritySelectProps = {
  id?: string;
  value: string;
  onChange?: (priority: string) => void;
};

export default function TaskPrioritySelect({
  id,
  value,
  onChange,
}: TaskPrioritySelectProps) {
  const [priority, setPriority] = useState<string>(value);

  const handleValueChange = (value: string) => {
    setPriority(value);

    // Call the onChange prop if provided
    onChange?.(value);
  };

  return (
    <Select defaultValue={priority} onValueChange={handleValueChange}>
      <SelectTrigger id={id}>
        <SelectValue placeholder="Select priority" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="LOW">
          <div className="flex items-center gap-2">
            <MdSignalCellular1Bar className="text-green-400" /> <span>Low</span>
          </div>
        </SelectItem>
        <SelectItem value="MEDIUM">
          <div className="flex items-center gap-2">
            <MdSignalCellular2Bar className="text-yellow-400" />{" "}
            <span>Medium</span>
          </div>
        </SelectItem>
        <SelectItem value="HIGH">
          <div className="flex items-center gap-2">
            <MdSignalCellular3Bar className="text-red-500" /> <span>High</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
