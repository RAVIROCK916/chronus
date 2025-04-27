import { useState, useContext, useMemo } from "react";

import TasksColumn from "./tasks-column";
import TaskCard from "./task-card";

import { Column as ColumnType, TaskStatus, Task as TaskType } from "@/types";

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DragOverEvent,
  useSensors,
  useSensor,
  PointerSensor,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { gql, useMutation } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { ProjectContext } from "@/app/(root)/(main)/projects/[name]/[projectId]/page";

const COLUMNS: ColumnType[] = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

export function useProjectContext() {
  const projectContext = useContext(ProjectContext);
  if (!projectContext) {
    throw new Error("useProjectContext must be used within a ProjectContext");
  }

  return projectContext;
}

export default function KanbanBoard() {
  const { project } = useProjectContext();

  const [tasks, setTasks] = useState<TaskType[]>(project.tasks || []);
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);

  const user = useSelector((state: RootState) => state.profile);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const [updateTask] = useMutation(gql`
    mutation UpdateTask($id: ID!, $status: String!) {
      updateTask(id: $id, status: $status) {
        id
        status
      }
    }
  `);

  function createTask(status: TaskStatus, title: string, description?: string) {
    const task = {
      id: crypto.randomUUID(),
      title,
      description,
      status,
      priority: "LOW",
      project_id: project.id,
      user_id: user.id,
      created_at: new Date().toISOString(),
    };
    setTasks((prevTasks) => [...prevTasks, task] as TaskType[]);
  }

  function deleteTask(id: string) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

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
    const currentTaskStatus = activeTask?.status;
    const newTaskStatus = event.over?.data.current?.task.status;
    if (currentTaskStatus !== newTaskStatus) {
      console.log("Task is already in the correct column.");
      updateTask({
        variables: {
          id: activeTask?.id,
          status: newTaskStatus,
        },
      });
    }
  }

  return (
    <div className="space-y-4">
      {/* <h2 className="text-2xl">Kanban Board</h2> */}
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart} // Track active dragging task
        onDragOver={handleDragOver} // Real-time reorder on hover
        onDragEnd={handleDragEnd} // Clear active task after drop
      >
        <div className="flex flex-wrap gap-6 *:flex-1">
          {COLUMNS.map((column) => {
            const columnTasks = useMemo(
              () => tasks.filter((task) => task.status === column.id),
              [tasks, column.id],
            );
            return (
              <TasksColumn
                key={column.id}
                column={column}
                tasks={columnTasks}
                createTask={createTask}
                deleteTask={deleteTask}
              />
            );
          })}
        </div>
        {/* Visual overlay that matches the drop position */}
        <DragOverlay>
          {activeTask ? (
            <TaskCard task={activeTask} deleteTask={deleteTask} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
