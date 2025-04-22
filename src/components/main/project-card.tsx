import { Project } from "@/types";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { Folder, PencilSimple, Trash } from "@phosphor-icons/react";
import DeleteProjectDialog from "./delete-project-dialog";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";

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
          className="min-h-20 w-80 cursor-pointer space-y-1 rounded-lg border border-input p-4 shadow-md transition-all hover:border-text-tertiary hover:shadow-sm"
          onClick={() => router.push(`/projects/${project.name}/${project.id}`)}
        >
          <div className="flex gap-2 text-secondary-foreground">
            <Folder size={24} />
            <div>
              <h4 className="line-clamp-1 text-lg">{project.name}</h4>
              <p className="line-clamp-2 text-xs text-muted-foreground">
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem>
          <PencilSimple size={16} />
          Edit Name
        </ContextMenuItem>
        <ContextMenuItem>
          <Star size={16} />
          Add to Favorites
        </ContextMenuItem>
        <DeleteProjectDialog
          projectName={project.name}
          handleDeleteProject={() => handleDeleteProject(project.id)}
        />
      </ContextMenuContent>
    </ContextMenu>
  );
}
