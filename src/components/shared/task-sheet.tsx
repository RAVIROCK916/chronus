import {
  Badge,
  Button,
  Separator,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  Textarea,
} from "@/components/ui";
import { Task } from "@/types";
import { CiShoppingTag } from "react-icons/ci";
import { FaRegCircleDot, FaTags } from "react-icons/fa6";
import { MdOutlineDescription, MdPriorityHigh } from "react-icons/md";
import { Clock } from "lucide-react";
import TextEditor from "./text-editor";

type TaskSheetProps = {
  task: Task;
};

export default function TaskSheet({ task }: TaskSheetProps) {
  return (
    <SheetContent
      className="min-w-[500px] p-0"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <SheetHeader className="px-6 py-4">
        <SheetTitle className="text-sm font-light">Project Name</SheetTitle>
      </SheetHeader>
      <Separator />
      <div className="space-y-4 px-6 py-4">
        {/* Task Name */}
        <h3 className="text-3xl">Task Name</h3>
        {/* Task Status, Priority, Due Date, Tags */}
        <table className="[&_td]:pl-12 [&_th]:py-2 [&_th]:text-left [&_th]:font-normal [&_th]:text-text-muted [&_tr]:text-sm">
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
        </table>
        {/* Task Description */}
        <div className="space-y-2">
          <div className="flex gap-2 text-text-muted">
            <MdOutlineDescription />
            <h3 className="text-sm">Description</h3>
          </div>
          {/* <Textarea value={task.description} className="h-20" /> */}
          <TextEditor />
        </div>
      </div>
      {/* Footer */}
      <SheetFooter className="px-6 py-4">
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button size="sm">Save</Button>
      </SheetFooter>
    </SheetContent>
  );
}
