"use client";

import BreadCrumb from "@/components/shared/breadcrumb";
import { Folder } from "lucide-react";
import { createContext } from "react";
import ProjectHeader from "@/components/main/project-header";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "@/lib/apollo/client/project";

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

  const { data } = useQuery(GET_PROJECT, {
    variables: { projectId },
  });

  const breadcrumbPaths = [
    { name: "Projects", url: "/projects", icon: Folder },
    { name: name, url: `/projects/${projectId}` },
  ];

  return (
    <ProjectContext.Provider value={{ project: { id: projectId, name } }}>
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
