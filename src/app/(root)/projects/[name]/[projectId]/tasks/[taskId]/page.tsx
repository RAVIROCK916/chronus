import { EditableText } from "@/components/shared/Editable-Text";
import TaskStatusSelect from "@/components/shared/task-status-select";

import { Task } from "@/types";

type TaskPageProps = {
  params: { projectId: string; taskId: string };
};

export default function TaskPage({ params }: TaskPageProps) {
  const { projectId, taskId } = params;

  console.log("projectId", projectId);
  console.log("taskId", taskId);

  return (
    <div className="flex gap-2 pr-4">
      <div className="flex-1">
        <p>Task Page</p>
      </div>
      <div className="w-60">
        <TaskStatusSelect />
      </div>
    </div>
  );
}
