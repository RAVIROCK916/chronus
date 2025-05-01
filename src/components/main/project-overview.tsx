import { useProjectPageContext } from "@/state/context";
import TasksTable from "./tasks-table";

export default function ProjectOverview() {
  const { project } = useProjectPageContext();
  return (
    <div className="pr-6">
      <TasksTable tasks={project.tasks} />
    </div>
  );
}
