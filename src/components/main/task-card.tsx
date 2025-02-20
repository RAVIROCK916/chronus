import { Task as TaskType } from "@/types";
import { useSortable } from "@dnd-kit/sortable";

type TaskCardProps = {
  task: TaskType;
};

export default function TaskCard({ task }: TaskCardProps) {
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
        transition:
          transition || "transform 300ms cubic-bezier(0.25, 1, 0.5, 1)",
      }
    : {};

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className="h-32 cursor-grab space-y-1 rounded-md border border-neutral-300 bg-backgroundGray p-3 px-4 opacity-10"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="h-32 cursor-grab space-y-1 rounded-md bg-backgroundGray p-3 px-4"
    >
      <h3 className="text-xl">{task.title}</h3>
      <p className="text-sm text-textGray">{task.description}</p>
    </div>
  );
}
