import { ProjectContext } from "@/app/(root)/projects/[name]/[projectId]/page";
import { cn } from "@/lib/utils";
import { TaskStatus, Task as TaskType } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { DotsSixVertical, Trash } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { Badge } from "../ui/badge";

type TaskCardProps = {
  task: TaskType;
  deleteTask: (id: string) => void;
};

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("Project not found");
  }
  return context;
}

export default function TaskCard({ task, deleteTask }: TaskCardProps) {
  const router = useRouter();

  const context = useProject();
  console.log(context);

  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
    transform,
    transition,
  } = useSortable({
    id: task.id,
    data: {
      type: "TASK",
      task,
    },
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        transition: transition,
      }
    : {};

  const getStyles = (status: TaskStatus) => {
    switch (status) {
      case "TODO":
        return "";
      case "IN_PROGRESS":
        return "";
      case "DONE":
        return "";
      default:
        return "";
    }
  };

  const styles = getStyles(task.status);

  function goToTaskPage(e: React.MouseEvent<HTMLDivElement>) {
    router.push(
      `/projects/${context.project.name}/${context.project.id}/tasks/${task.id}`,
    );
  }

  function handleDeleteTask(e: React.MouseEvent<SVGSVGElement>) {
    e.stopPropagation();
    deleteTask(task.id);
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className="h-32 cursor-grab space-y-1 border border-neutral-500 bg-background-hover p-3 px-4 opacity-50"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group cursor-pointer space-y-2.5 rounded-md bg-background-secondary px-4 py-3 transition-all hover:opacity-90",
        styles,
      )}
      onClick={goToTaskPage}
    >
      <div>
        <Badge
          variant={task.priority.toLowerCase() as "low" | "medium" | "high"}
          className="font-normal"
        >
          {task.priority}
        </Badge>
      </div>
      <div className="flex justify-between gap-2">
        <h3 className="">{task.title}</h3>
        <div className="invisible mt-1 flex gap-2 group-hover:visible">
          <DotsSixVertical
            {...attributes}
            {...listeners}
            onClick={(e) => e.stopPropagation()}
            className="cursor-grab text-neutral-500 outline-none transition-all hover:text-neutral-200"
          />
          <Trash
            size="16"
            onClick={(e) => handleDeleteTask(e)}
            className="cursor-pointer text-neutral-500 transition-all hover:text-neutral-200"
          />
        </div>
      </div>
    </div>
  );
}
