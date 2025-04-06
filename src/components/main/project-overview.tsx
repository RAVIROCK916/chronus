import TasksTable from "./tasks-table";
import { useProjectContext } from "./kanban-board";

export default function ProjectOverview() {
  const { project } = useProjectContext();
  return (
    <div className="pr-6">
      <TasksTable tasks={project.tasks} />
    </div>
  );
}
