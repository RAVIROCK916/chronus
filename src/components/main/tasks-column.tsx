import TaskCard from "./task-card";
import { Column as ColumnType, Task as TaskType } from "@/types";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

type TaskColumnProps = {
  column: ColumnType;
  tasks: TaskType[];
};

export default function TasksColumn({ column, tasks }: TaskColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
    data: { type: "COLUMN" },
  });

  return (
    <div
      ref={setNodeRef}
      className="w-96 space-y-2 rounded-md border border-border p-3"
    >
      <h2 className="text-textGray">{column.title}</h2>
      <SortableContext items={tasks.map((task) => task.id)}>
        <div
          className="h-full min-h-[100px] space-y-4 transition-all duration-500 ease-in-out"
          style={{
            transitionProperty: "height, padding",
          }}
        >
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
