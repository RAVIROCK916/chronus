import TasksTable from "./tasks-table";
import { useProjectContext } from "./kanban-board";

export default function ProjectOverview() {
  const { project } = useProjectContext();
  return (
    <div>
      <TasksTable tasks={project.tasks} />
    </div>
  );
}
