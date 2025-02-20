import { useMemo, useState } from "react";

import TasksColumn from "./tasks-column";
import TaskCard from "./task-card";
import { Column as ColumnType, Task as TaskType } from "@/types";

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

const COLUMNS: ColumnType[] = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

const INITIAL_TASKS: TaskType[] = [
  {
    id: "1",
    title: "Research Project",
    description: "Gather requirements and create initial documentation",
    status: "TODO",
  },
  {
    id: "2",
    title: "Design System",
    description: "Create component library and design tokens",
    status: "TODO",
  },
  {
    id: "3",
    title: "API Integration",
    description: "Implement REST API endpoints",
    status: "IN_PROGRESS",
  },
  {
    id: "4",
    title: "Testing",
    description: "Write unit tests for core functionality",
    status: "DONE",
  },
];

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<TaskType[]>(INITIAL_TASKS);
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    if (task) setActiveTask(task);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeId = active.id;
    const overId = over.id;

    setTasks((prevTasks) => {
      const activeTaskIndex = prevTasks.findIndex((t) => t.id === activeId);
      const overTaskIndex = prevTasks.findIndex((t) => t.id === overId);

      if (overTaskIndex === -1) {
        // Dropping over a column
        const columnId = over.id;
        return prevTasks.map((task) =>
          task.id === activeId
            ? { ...task, status: columnId as TaskType["status"] }
            : task,
        );
      } else {
        // Reordering within or across columns
        const overTaskData = prevTasks[overTaskIndex];

        const reorderedTasks = arrayMove(
          prevTasks,
          activeTaskIndex,
          overTaskIndex,
        ).map((task) =>
          task.id === activeId
            ? { ...task, status: overTaskData.status } // Update column status if moved across
            : task,
        );
        return reorderedTasks;
      }
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveTask(null); // Clear active task after drop
  }

  return (
    <div className="space-y-4">
      <h1>Kanban Board</h1>
      <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver} // Real-time reorder on hover
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-8">
          {COLUMNS.map((column) => (
            <TasksColumn
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
            />
          ))}
        </div>
        {/* Visual overlay that matches the drop position */}
        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
