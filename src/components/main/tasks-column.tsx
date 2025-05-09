import TaskCard from "./task-card";
import { TaskStatus, Task as TaskType } from "@/types";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { Button } from "../ui/button";
import { EllipsisVertical, Plus } from "lucide-react";
import { useRef, useState } from "react";
import TaskInputCard from "./task-input-card";
import useClickOutside from "@/hooks/useClickOutside";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import TaskSheet from "../shared/task-sheet";
import { cn } from "@/lib/utils";
import { useProjectPageContext } from "@/state/context";
import CreateTaskDialog from "./create-task-dialog";

type TaskColumnProps = {
  column: any;
  tasks: TaskType[];
  createTask: (status: TaskStatus, title: string, description?: string) => void;
  deleteTask: (id: string) => void;
};

export default function TasksColumn({
  column,
  tasks,
  createTask,
  deleteTask,
}: TaskColumnProps) {
  const inputTaskRef = useRef<HTMLDivElement>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isTaskInputOpen, setIsTaskInputOpen] = useState(false);

  const { project } = useProjectPageContext();

  useClickOutside(inputTaskRef, () => setIsTaskInputOpen(false));

  const { setNodeRef } = useDroppable({
    id: column.id,
    data: { type: "COLUMN", id: column.id },
  });

  return (
    <div className="max-w-[350px] space-y-2 rounded-md border border-border bg-color-background">
      <div ref={setNodeRef} className="space-y-4 self-start p-4">
        <div className="flex justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="h-5 w-[5px] rounded-[2px]"
              style={{
                backgroundColor: `hsl(var(--${column.color}))`,
              }}
            ></div>
            <h4 className="text-sm text-text-muted">{column.title}</h4>
            <span
              className="rounded bg-background-tertiary px-[5px] py-0.5 text-xs"
              style={{
                color: `hsl(var(--${column.color}))`,
                filter: "brightness(1.2)",
              }}
            >
              {tasks.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger>
                <Plus size={16} strokeWidth={2} aria-hidden="true" />
              </SheetTrigger>
              <TaskSheet
                task={{
                  status: column.id,
                }}
                projectId={project.id}
                onClose={() => setIsSheetOpen(false)}
              />
            </Sheet>
            <EllipsisVertical size={16} aria-hidden="true" />
          </div>
        </div>
        <SortableContext items={tasks.map((task) => task.id)}>
          <div
            className="h-auto space-y-3 transition-all duration-500 ease-in-out"
            style={{
              transitionProperty: "height, padding",
            }}
          >
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} deleteTask={deleteTask} />
            ))}
          </div>
        </SortableContext>
        {/* <Button
          variant="ghost"
          className="w-full gap-1 text-muted"
          onClick={() => setIsTaskInputOpen(true)}
        >
          <Plus
            className="opacity-60 sm:-ms-1 sm:me-2"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          Add Task
        </Button> */}
        <CreateTaskDialog>
          <Button variant="outline" className="w-full gap-1 text-text-muted">
            Add Task
          </Button>
        </CreateTaskDialog>
      </div>
    </div>
  );
}
