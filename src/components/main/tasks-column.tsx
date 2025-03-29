import TaskCard from "./task-card";
import { Column as ColumnType, TaskStatus, Task as TaskType } from "@/types";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import TaskInputCard from "./task-input-card";
import useClickOutside from "@/hooks/useClickOutside";

type TaskColumnProps = {
  column: ColumnType;
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
  const [isTaskInputOpen, setIsTaskInputOpen] = useState(false);

  useClickOutside(inputTaskRef, () => setIsTaskInputOpen(false));

  const { setNodeRef } = useDroppable({
    id: column.id,
    data: { type: "COLUMN", id: column.id },
  });

  return (
    <div
      ref={setNodeRef}
      className="w-96 space-y-2 self-start rounded-md border border-border px-4 py-3"
    >
      <h2 className="text-text-tertiary">{column.title}</h2>
      <SortableContext items={tasks.map((task) => task.id)}>
        <div
          className="max-h-[500px] space-y-3 overflow-auto transition-all duration-500 ease-in-out"
          style={{
            transitionProperty: "height, padding",
          }}
        >
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} deleteTask={deleteTask} />
          ))}
        </div>
      </SortableContext>
      <div>
        {isTaskInputOpen ? (
          <TaskInputCard
            ref={inputTaskRef}
            status={column.id}
            createTask={createTask}
          />
        ) : (
          <Button
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
          </Button>
        )}
      </div>
    </div>
  );
}
