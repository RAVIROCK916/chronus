import { Project } from "@/types";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { PencilSimple, Trash } from "@phosphor-icons/react";
import DeleteProjectDialog from "./delete-project-dialog";
import { useRouter } from "next/navigation";

type ProjectCardProps = {
  project: Project;
  handleDeleteProject: (id: string) => void;
};

export default function ProjectCard({
  project,
  handleDeleteProject,
}: ProjectCardProps) {
  const router = useRouter();

  return (
    <ContextMenu>
      <ContextMenuTrigger className="data-[state=open]:bg-accent" asChild>
        <div
          className="mb-4 w-80 cursor-pointer space-y-1 rounded-lg border border-input p-4 transition-all hover:bg-backgroundGray"
          onClick={() => router.push(`/projects/${project.name}`)}
        >
          <h2 className="text-xl">{project.name}</h2>
          <p className="text-sm text-gray-400">{project.description}</p>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem>
          <PencilSimple size={16} />
          Edit Name
        </ContextMenuItem>
        <DeleteProjectDialog
          projectName={project.name}
          handleDeleteProject={() => handleDeleteProject(project.id)}
        />
      </ContextMenuContent>
    </ContextMenu>
  );
}
