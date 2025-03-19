import { useState, useEffect, useContext, useMemo } from "react";

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
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { ProjectContext } from "@/app/(root)/projects/[name]/[projectId]/page";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

const COLUMNS: ColumnType[] = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

export function useProject() {
  const projectContext = useContext(ProjectContext);
  if (!projectContext) {
    throw new Error("useProject must be used within a ProjectContext");
  }

  return projectContext;
}

export default function KanbanBoard() {
  const { project } = useProject();
  const { data } = useQuery(
    gql`
      query GetTasks($projectId: ID!) {
        tasks(projectId: $projectId) {
          id
          title
          description
          status
          priority
        }
      }
    `,
    {
      variables: { projectId: project.id },
    },
  );

  const [tasks, setTasks] = useState<TaskType[]>(data?.tasks || []);
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);

  const user = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    if (data?.tasks) {
      setTasks(data.tasks);
    }
  }, [data]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

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
    setTasks((prevTasks) => [...prevTasks, task]);
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
  }

  return (
    <div className="space-y-4">
      <h1>Kanban Board</h1>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart} // Track active dragging task
        onDragOver={handleDragOver} // Real-time reorder on hover
        onDragEnd={handleDragEnd} // Clear active task after drop
      >
        <div className="flex gap-8">
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
