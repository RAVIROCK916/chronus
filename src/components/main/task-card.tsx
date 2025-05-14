import { cn } from "@/lib/utils";
import { TaskStatus, Task as TaskType } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { DotsSixVertical, Trash } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { Badge } from "../ui/badge";
import { Clock, EditIcon } from "lucide-react";
import { CiEdit } from "react-icons/ci";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import TaskSheet from "@/components/shared/task-sheet";
import { Separator } from "@/components/ui/separator";
import { FaRegCommentAlt } from "react-icons/fa";
import Link from "next/link";
import { useProjectPageContext } from "@/state/context";
import { toast } from "sonner";
// import { useProject } from "./kanban-board";

type TaskCardProps = {
  task: TaskType;
  deleteTask: (id: string) => void;
};

export default function TaskCard({ task, deleteTask }: TaskCardProps) {
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { project } = useProjectPageContext();

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

  function handleDeleteTask(e: React.MouseEvent<SVGSVGElement>) {
    e.stopPropagation();
    deleteTask(task.id);
  }

  // if (isDragging) {
  //   return (
  //     <div
  //       ref={setNodeRef}
  //       {...attributes}
  //       {...listeners}
  //       style={style}
  //       className="h-40 cursor-grab space-y-1 rounded-md border border-neutral-800 bg-background-secondary p-4 opacity-50"
  //     />
  //   );
  // }

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, opacity: isDragging ? 0.2 : 1 }}
      className={cn(
        "group space-y-2.5 rounded-md border bg-background/60 p-4 backdrop-blur transition-all dark:bg-background/80",
      )}
    >
      <div className="z-50 flex justify-between gap-2">
        <Badge
          variant={task.priority.toLowerCase() as "low" | "medium" | "high"}
          className="px-1.5 text-[10px] tracking-wide"
        >
          {task.priority}
        </Badge>
        {/* Edit, Drag, Delete  */}
        <div className="invisible mt-1 flex gap-2 group-hover:visible">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger onClick={(e) => e.stopPropagation()}>
              <CiEdit
                size="16"
                className="text-neutral-500 outline-none transition-all hover:text-neutral-200"
              />
            </SheetTrigger>
            <TaskSheet
              task={task}
              onSuccess={() => toast.success("Task updated successfully")}
              onClose={() => setIsSheetOpen(false)}
            />
          </Sheet>
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
      <div>
        <Link
          href={`/projects/${project.name}/${project.id}/tasks/${task.title}/${task.id}`}
        >
          <span className="text-sm decoration-dashed hover:underline">
            {task.title}
          </span>
        </Link>
        <p className="line-clamp-2 text-xs text-text-muted">
          {task.description}
        </p>
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <FaRegCommentAlt size={14} className="text-neutral-500" />
          <span className="text-xs text-neutral-500">0</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={14} className="text-neutral-500" />
          <span className="text-xs text-neutral-500">4d</span>
        </div>
      </div>
    </div>
  );
}
