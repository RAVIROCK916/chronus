import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Task } from "@/types";
import { CiShoppingTag } from "react-icons/ci";
import { FaRegCircleDot, FaTags } from "react-icons/fa6";
import { MdOutlineDescription, MdPriorityHigh } from "react-icons/md";
import { Clock } from "lucide-react";
import TextEditor from "./text-editor";
import TaskStatusSelect from "./task-status-select";
import TaskPrioritySelect from "./task-priority-select";
import TaskLabelInput from "./task-label-input";

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
        <div className="space-y-4">
          <div className="space-y-1">
            <Label className="text-sm text-text-muted">Name</Label>
            <Input
              value={task.title}
              onChange={(e: any) => console.log(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="flex-1 space-y-1">
              <Label className="text-sm text-text-muted">Status</Label>
              <TaskStatusSelect id={task.id} taskStatus={task.status} />
            </div>
            <div className="flex-1 space-y-1">
              <Label className="text-sm text-text-muted">Priority</Label>
              <TaskPrioritySelect id={task.id} taskPriority={task.priority} />
            </div>
          </div>
          {task.labels && (
            <div className="text-text-muted">
              <TaskLabelInput labels={task.labels} onChange={() => {}} />
            </div>
          )}
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
      </div>
      {/* Footer */}
      <SheetFooter className="px-6 py-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </SheetFooter>
    </SheetContent>
  );
}
