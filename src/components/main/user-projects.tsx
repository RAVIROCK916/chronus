import { Project } from "@/types";
import ProjectCard from "./project-card";

import { toast } from "sonner";
import { gql, useMutation } from "@apollo/client";

type UserProjectsProps = {
  projects: Project[];
  handleRemoveProject: (id: string) => void;
};

export default function UserProjects({
  projects,
  handleRemoveProject,
}: UserProjectsProps) {
  const [deleteProject] = useMutation(gql`
    mutation DeleteProject($id: ID!) {
      deleteProject(id: $id) {
        id
        name
        description
      }
    }
  `);

  const handleDeleteProject = async (id: string) => {
    try {
      await deleteProject({
        variables: { id: id },
      });
      handleRemoveProject(id);
      toast.success("Project deleted successfully");
    } catch (err) {
      toast.error("Error deleting project");
      console.error("error", err);
    }
  };

  return (
    <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
      {projects.map((project: any) => (
        <ProjectCard
          key={project.id}
          project={project}
          handleDeleteProject={handleDeleteProject}
        />
      ))}
    </div>
  );
}
