"use client";

import AddButton from "@/components/shared/add-button";
import BreadCrumb from "@/components/shared/breadcrumb";
import ClientKanbanBoard from "@/components/main/client-kanban-board";
import { Folder } from "lucide-react";
import { createContext } from "react";
import ProjectHeader from "@/components/main/project-header";

type ProjectPageProps = {
  params: {
    name: string;
    projectId: string;
  };
};

export const ProjectContext = createContext<{
  project: { id: string; name: string };
} | null>(null);

export default function ProjectPage({
  params: { name, projectId },
}: ProjectPageProps) {
  name = decodeURIComponent(name);

  const breadcrumbPaths = [
    { name: "Projects", url: "/projects", icon: Folder },
    { name: name, url: `/projects/${projectId}` },
  ];

  return (
    <ProjectContext.Provider value={{ project: { id: projectId, name } }}>
      <div className="space-y-4 py-6">
        <BreadCrumb paths={breadcrumbPaths} />
        <div>
          <h1 className="text-4xl">{name}</h1>
          {/* <p>Description: {project.description}</p> */}
          {/* <AddButton text="Add task" /> */}
        </div>
        <ProjectHeader />
      </div>
    </ProjectContext.Provider>
  );
}
