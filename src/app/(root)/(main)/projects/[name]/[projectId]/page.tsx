"use client";

import BreadCrumb from "@/components/shared/breadcrumb";
import { Folder } from "lucide-react";
import { createContext, useState } from "react";
import ProjectHeader from "@/components/main/project-header";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "@/lib/apollo/client/project";
import { Project } from "@/types";

type ProjectPageProps = {
  params: {
    name: string;
    projectId: string;
  };
};

export const ProjectContext = createContext<{
  project: Project;
  addTask: (task: any) => void;
  deleteTask: (taskId: string) => void;
  deleteTasks(taskIds: string[]): void;
} | null>(null);

export default function ProjectPage({
  params: { name, projectId },
}: ProjectPageProps) {
  name = decodeURIComponent(name);

  const [project, setProject] = useState<Project | null>(null);

  const { data, loading } = useQuery<{ project: Project }>(GET_PROJECT, {
    variables: { projectId },
  });

  const addTask = (task: any) => {
    if (project) {
      setProject({
        ...project,
        tasks: [...project.tasks, task],
      });
    }
  };

  const deleteTask = (taskId: string) => {
    if (project) {
      setProject({
        ...project,
        tasks: project.tasks.filter((task) => task.id !== taskId),
      });
    }
  };

  const deleteTasks = (taskIds: string[]) => {
    if (project) {
      setProject({
        ...project,
        tasks: project.tasks.filter((task) => !taskIds.includes(task.id)),
      });
    }
  };

  const breadcrumbPaths = [
    { name: "Projects", url: "/projects", icon: Folder },
    { name: name, url: `/projects/${projectId}` },
  ];

  if (data?.project && !project) {
    setProject(data.project);
  }

  if (loading || !project) {
    return <div>Loading...</div>;
  }

  return (
    <ProjectContext.Provider
      value={{ project, addTask, deleteTask, deleteTasks }}
    >
      <div className="space-y-6 py-3">
        <BreadCrumb paths={breadcrumbPaths} />
        <div className="space-y-2">
          <h1 className="text-4xl">{name}</h1>
          <p className="text-text-muted">{data?.project?.description}</p>
          {/* <AddButton text="Add task" /> */}
        </div>
        <ProjectHeader />
      </div>
    </ProjectContext.Provider>
  );
}
